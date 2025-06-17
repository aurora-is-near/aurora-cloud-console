import type { NextRequest } from "next/server"
import Stripe from "stripe"
import type { ProductMetadata, ProductType } from "@/types/products"
import type { Silo, Team } from "@/types/types"
import { abort } from "@/utils/abort"
import { toError } from "@/utils/errors"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { createPrivateApiEndpoint } from "@/utils/api"
import { PRODUCT_TYPES } from "@/constants/products"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { sendSlackMessage } from "@/utils/send-slack-notification"
import { getTeam } from "@/actions/teams/get-team"
import { getStripeConfig } from "@/utils/stripe"
import { trackEvent } from "@/actions/analytics"
import { processNearOrder } from "@/actions/fiat-topup/process-near-order"
import { getSilo } from "@/actions/silos/get-silo"

type WebhookResponse = {
  fulfilled: boolean
  teamId: number
  siloId?: number
  paymentId?: number
}

const sendSlackNotification = async (
  session: Stripe.Checkout.Session,
  teamId: number,
  silo: Silo,
  team?: Team | null,
) => {
  const summary = `Payment received for the "${
    team?.name ?? "Unknown"
  }" team (ACC ID: ${teamId}) - Silo: ${silo?.name ?? "Unknown"}`

  await sendSlackMessage({
    text: summary,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: summary,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          text: `*Customer Name*\n${session.customer_details?.name ?? "Unknown"}`,
          type: "mrkdwn",
        },
      },
      {
        type: "section",
        text: {
          text: `*Customer Email Address*\n${session.customer_details?.email ?? "Unknown"}`,
          type: "mrkdwn",
        },
      },
    ],
  })
}

const getTeamFromId = async (teamId: number) => {
  let team: Team | null

  try {
    team = await getTeam(teamId)
  } catch (error) {
    throw new Error(
      `Failed to get team with ID ${teamId}: ${toError(error).message}`,
    )
  }

  if (!team) {
    throw new Error(`Team with ID ${teamId} not found`)
  }

  return team
}

const createPayment = async <T extends ProductType>(
  session: Stripe.Checkout.Session,
  teamId: number,
  siloId: number,
  type: T,
  productMetadata: ProductMetadata[T],
) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("orders")
    .insert({
      type,
      payment_status: session.payment_status,
      session_id: session.id,
      team_id: teamId,
      silo_id: siloId,
      number_of_transactions: productMetadata.number_of_transactions,
    })
    .select("id")
    .single()

  assertValidSupabaseResult(result)

  return result.data.id
}

const fulfillOrder = async <T extends ProductType>(
  session: Stripe.Checkout.Session,
  teamId: number,
  siloId: number,
  productMetadata: ProductMetadata[T],
) => {
  const supabase = createAdminSupabaseClient()
  const team = await getTeamFromId(teamId)
  const silo = await getSilo(siloId)

  if (!silo) {
    abort(400, `Silo with ID ${siloId} not found`)
  }

  const [ordersResult] = await Promise.all([
    supabase
      .from("orders")
      .update({
        payment_status: session.payment_status,
      })
      .eq("session_id", session.id)
      .select("id")
      .single(),
    supabase
      .from("teams")
      .update({
        prepaid_transactions:
          team.prepaid_transactions +
          (productMetadata.number_of_transactions ?? 0),
      })
      .eq("id", teamId)
      .select()
      .single(),
    sendSlackNotification(session, teamId, silo, team),
    trackEvent("payment_received"),
  ])

  assertValidSupabaseResult(ordersResult)

  if (silo) {
    await processNearOrder({
      silo,
      amount: session.amount_total ? session.amount_total / 100 : 0,
    })
  }

  return ordersResult.data.id
}

const isSupportedEvent = (
  event: Stripe.Event,
): event is
  | Stripe.CheckoutSessionCompletedEvent
  | Stripe.CheckoutSessionAsyncPaymentFailedEvent
  | Stripe.CheckoutSessionAsyncPaymentSucceededEvent
  | Stripe.CheckoutSessionExpiredEvent => {
  return event.type.startsWith("checkout.session.")
}

const isValidProductType = (
  productType: string,
): productType is ProductType => {
  return PRODUCT_TYPES.includes(productType as ProductType)
}

const getValidProductMetadata = <T extends ProductType>(
  productType: T,
  metadata: Record<string, unknown>,
): ProductMetadata[T] => {
  if (productType === "top_up" && !metadata.number_of_transactions) {
    abort(
      400,
      `The product "${productType}" must include "number_of_transactions" in the session metadata`,
    )
  }

  return {
    number_of_transactions: metadata.number_of_transactions
      ? Number(metadata.number_of_transactions)
      : 0,
  } as ProductMetadata[T]
}

export const POST = createPrivateApiEndpoint<WebhookResponse>(
  async (req: NextRequest) => {
    const { secretKey, webhookSecret } = await getStripeConfig()

    const payload = await req.text()
    const sig = req.headers.get("stripe-signature")

    if (!payload) {
      abort(400, "No payload provided")
    }

    if (!sig) {
      abort(400, "No signature provided")
    }

    if (!webhookSecret) {
      abort(500, "Stripe webhook secret is not set")
    }

    if (!secretKey) {
      abort(500, "Stripe secret key is not set")
    }

    const stripe = new Stripe(secretKey)
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret)
    } catch (err) {
      abort(400, toError(err).message)
    }

    if (!isSupportedEvent(event)) {
      abort(400, "Unsupported event type")
    }

    const session = event.data.object
    const {
      team_id: teamIdStr,
      product_type: productType,
      silo_id: siloIdStr,
      ...additionalMetadata
    } = session.metadata ?? {}

    const teamId = Number(teamIdStr)
    const siloId = Number(siloIdStr)

    if (!teamId || !Number.isFinite(teamId)) {
      abort(400, `Invalid team ID found in session metadata: ${teamId}`)
    }

    if (!isValidProductType(productType)) {
      abort(
        400,
        `Invalid product type found in session metadata: ${productType}`,
      )
    }

    const productMetadata = getValidProductMetadata(
      productType,
      additionalMetadata,
    )

    if (event.type === "checkout.session.completed") {
      const paymentId = await createPayment(
        session,
        teamId,
        siloId,
        productType,
        productMetadata,
      )

      // Check if the order was paid for (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // we're still waiting for funds to be transferred from the customer's
      // account.
      const fulfilled = session.payment_status === "paid"

      // If already paid, fulfill the order.
      if (fulfilled) {
        await fulfillOrder(session, teamId, siloId, productMetadata)
      }

      return {
        teamId,
        siloId,
        fulfilled,
        paymentId,
      }
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
      return {
        teamId,
        siloId,
        fulfilled: true,
        paymentId: await fulfillOrder(session, teamId, siloId, productMetadata),
      }
    }

    // TODO: Email the customer about the failed payment
    if (event.type === "checkout.session.async_payment_failed") {
      return {
        teamId,
        fulfilled: false,
      }
    }

    if (event.type === "checkout.session.expired") {
      return {
        teamId,
        fulfilled: false,
      }
    }

    abort(400, "Unsupported event type")
  },
)

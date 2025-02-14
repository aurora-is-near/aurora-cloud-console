import Stripe from "stripe"
import { type NextRequest } from "next/server"
import { abort } from "@/utils/abort"
import { toError } from "@/utils/errors"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { createPrivateApiEndpoint } from "@/utils/api"
import { ProductMetadata, ProductType } from "@/types/products"
import { PRODUCT_TYPES } from "@/constants/products"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { sendSlackMessage } from "@/utils/send-slack-notification"
import { getTeam } from "@/actions/teams/get-team"
import { Team } from "@/types/types"
import { sendEmail } from "@/utils/email"
import { getRequestReceivedEmail } from "@/email-templates/get-request-received-email"
import { getStripeConfig } from "@/utils/stripe"
import { trackEvent } from "@/components/Mixpanel/ServerTracker"
import { getTeamMembers } from "@/actions/team-members/get-team-members"

type WebhookResponse = {
  fulfilled: boolean
  teamId: number
  paymentId?: number
}

const sendSlackNotification = async (
  session: Stripe.Checkout.Session,
  teamId: number,
  team?: Team | null,
) => {
  const summary = `Payment received for the "${
    team?.name ?? "Unknown"
  }" team (ACC ID: ${teamId})`

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

const sendEmails = async (
  session: Stripe.Checkout.Session,
  team?: Team | null,
) => {
  const teamMembers = team ? await getTeamMembers(team.team_key) : []
  const teamEmails = teamMembers.map((member) => member.email)
  const emailAddresses = [
    session.customer_details?.email,
    ...teamEmails,
  ].filter((email): email is string => !!email)

  await sendEmail({
    To: emailAddresses.join(),
    Subject: "Your request was received",
    HtmlBody: getRequestReceivedEmail(),
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
  productMetadata: ProductMetadata[T],
) => {
  const supabase = createAdminSupabaseClient()
  const team = await getTeamFromId(teamId)

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
        onboarding_status: "REQUEST_RECEIVED",
        prepaid_transactions:
          team.prepaid_transactions +
          (productMetadata.number_of_transactions ?? 0),
      })
      .eq("id", teamId)
      .select()
      .single(),
    sendSlackNotification(session, teamId, team),
    sendEmails(session, team),
    trackEvent("payment_received"),
  ])

  assertValidSupabaseResult(ordersResult)

  return ordersResult.data.id
}

const isSupportedEvent = (
  event: Stripe.Event,
): event is
  | Stripe.CheckoutSessionCompletedEvent
  | Stripe.CheckoutSessionAsyncPaymentFailedEvent
  | Stripe.CheckoutSessionAsyncPaymentSucceededEvent => {
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
      ...additionalMetadata
    } = session.metadata ?? {}

    const teamId = Number(teamIdStr)

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
        await fulfillOrder(session, teamId, productMetadata)
      }

      return {
        teamId,
        fulfilled,
        paymentId,
      }
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
      return {
        teamId,
        fulfilled: true,
        paymentId: await fulfillOrder(session, teamId, productMetadata),
      }
    }

    // TODO: Email the customer about the failed payment
    if (event.type === "checkout.session.async_payment_failed") {
      return {
        teamId,
        fulfilled: false,
      }
    }

    abort(400, "Unsupported event type")
  },
)

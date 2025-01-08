import Stripe from "stripe"
import { type NextRequest, NextResponse } from "next/server"
import { abort } from "@/utils/abort"
import { toError } from "@/utils/errors"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { createPrivateApiEndpoint } from "@/utils/api"
import { ApiErrorResponse } from "@/types/api"
import { ProductType } from "@/types/products"
import { PRODUCT_TYPES } from "@/constants/products"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET

type WebhookResponse = {
  fulfilled: boolean
  teamId: number
  paymentId?: number
}

const createPayment = async (
  session: Stripe.Checkout.Session,
  teamId: number,
  type: ProductType,
) => {
  const supabase = createAdminSupabaseClient()

  const { data } = await supabase
    .from("orders")
    .insert({
      type,
      payment_status: session.payment_status,
      session_id: session.id,
      team_id: teamId,
      checkout_session_object: JSON.stringify(session),
    })
    .select("id")
    .single()

  if (!data) {
    throw new Error("Failed to record the payment")
  }

  return data.id
}

const fulfillOrder = async (
  session: Stripe.Checkout.Session,
  teamId: number,
) => {
  const supabase = createAdminSupabaseClient()

  const [{ data: ordersData }] = await Promise.all([
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
      .update({ onboarding_status: "REQUEST_RECEIVED" })
      .eq("id", teamId),
  ])

  if (!ordersData) {
    throw new Error("Failed to fulfill the order")
  }

  return ordersData.id
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

export const POST = createPrivateApiEndpoint(
  async (
    req: NextRequest,
  ): Promise<NextResponse<WebhookResponse | ApiErrorResponse>> => {
    const payload = await req.text()
    const sig = req.headers.get("stripe-signature")

    if (!payload) {
      abort(400, "No payload provided")
    }

    if (!sig) {
      abort(400, "No signature provided")
    }

    if (!stripeWebhookSecret) {
      abort(500, "Stripe webhook secret is not set")
    }

    if (!stripeSecretKey) {
      abort(500, "Stripe secret key is not set")
    }

    const stripe = new Stripe(stripeSecretKey)
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSecret)
    } catch (err) {
      abort(400, toError(err).message)
    }

    if (!isSupportedEvent(event)) {
      abort(400, "Unsupported event type")
    }

    const session = event.data.object
    const { team_id: teamIdStr, product_type: productType } =
      session.metadata ?? {}

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

    if (event.type === "checkout.session.completed") {
      const paymentId = await createPayment(session, teamId, productType)

      // Check if the order was paid for (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // we're still waiting for funds to be transferred from the customer's
      // account.
      const fulfilled = session.payment_status === "paid"

      // If already paid, fulfill the order.
      if (fulfilled) {
        await fulfillOrder(session, teamId)
      }

      return NextResponse.json({
        teamId,
        fulfilled,
        paymentId,
      })
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
      return NextResponse.json({
        teamId,
        fulfilled: true,
        paymentId: await fulfillOrder(session, teamId),
      })
    }

    // TODO: Email the customer about the failed payment
    if (event.type === "checkout.session.async_payment_failed") {
      return NextResponse.json({
        teamId,
        fulfilled: false,
      })
    }

    abort(400, "Unsupported event type")
  },
)

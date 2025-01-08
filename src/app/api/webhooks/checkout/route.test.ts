/**
 * @jest-environment node
 */
import Stripe from "stripe"
import { NextRequest } from "next/server"
import { logger } from "@/logger"
import { POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import { mockTeam } from "../../../../../test-utils/mock-team"
import { createMockOrder } from "../../../../../test-utils/factories/order-factory"

jest.mock("stripe")

const stripeSecretKey = "test_stripe_secret_key"
const stripeWebhookSecret = "test_stripe_webhook_secret"

const stripeMock = {
  webhooks: {
    constructEvent: jest.fn(),
  },
}

;(Stripe as unknown as jest.Mock).mockImplementation(() => stripeMock)

describe("Checkout webhook route", () => {
  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = stripeSecretKey
    process.env.STRIPE_WEBHOOK_SECRET = stripeWebhookSecret

    mockSupabaseClient
      .from("orders")
      .select.mockImplementation(() => createSelect([]))

    mockSupabaseClient
      .from("teams")
      .select.mockImplementation(() => createSelect([]))
  })

  it("returns a 400 if no payload is provided", async () => {
    logger.error = jest.fn()

    const req = new NextRequest("https://example.com", { method: "POST" })

    const res = await POST(req, { params: {} })

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({
      message: "No payload provided",
      statusCode: 400,
      type: "/probs/bad-request",
    })

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledWith(new Error("No payload provided"))
  })

  it("returns a 400 if no signature is provided", async () => {
    logger.error = jest.fn()

    const req = new NextRequest("https://example.com", {
      method: "POST",
      body: "payload",
    })

    const res = await POST(req, { params: {} })

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({
      message: "No signature provided",
      statusCode: 400,
      type: "/probs/bad-request",
    })

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledWith(
      new Error("No signature provided"),
    )
  })

  it("returns a 500 if the webhook secret is not set", async () => {
    logger.error = jest.fn()

    delete process.env.STRIPE_WEBHOOK_SECRET

    const req = new NextRequest("https://example.com", {
      method: "POST",
      body: "payload",
      headers: { "stripe-signature": "signature" },
    })

    const res = await POST(req, { params: {} })

    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({
      message: "Stripe webhook secret is not set",
      statusCode: 500,
      type: "/probs/internal-server-error",
    })

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledWith(
      new Error("Stripe webhook secret is not set"),
    )
  })

  it("returns a 400 for invalid events", async () => {
    logger.error = jest.fn()

    stripeMock.webhooks.constructEvent.mockImplementation(() => ({
      type: "invalid.event",
    }))

    const req = new NextRequest("https://example.com", {
      method: "POST",
      body: "payload",
      headers: { "stripe-signature": "signature" },
    })

    const res = await POST(req, { params: {} })

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({
      message: "Unsupported event type",
      statusCode: 400,
      type: "/probs/bad-request",
    })

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledWith(
      new Error("Unsupported event type"),
    )
  })

  it("handles a checkout.session.completed event", async () => {
    const teamId = 42
    const session = {
      id: "session_id",
      metadata: {
        team_id: String(teamId),
        product_type: "initial_setup",
      },
      payment_status: "paid",
    }

    stripeMock.webhooks.constructEvent.mockImplementation(() => ({
      type: "checkout.session.completed",
      data: { object: session },
    }))

    const req = new NextRequest("https://example.com", {
      method: "POST",
      body: "payload",
      headers: { "stripe-signature": "signature" },
    })

    const mockOrder = createMockOrder()
    const teamUpdateQueries = createInsertOrUpdate(mockTeam)
    const ordersInsertQueries = createInsertOrUpdate(mockOrder)

    mockSupabaseClient
      .from("teams")
      .update.mockImplementation(() => teamUpdateQueries)

    mockSupabaseClient
      .from("orders")
      .insert.mockImplementation(() => ordersInsertQueries)

    mockSupabaseClient
      .from("orders")
      .update.mockImplementation(() => ordersInsertQueries)

    const res = await POST(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      teamId,
      fulfilled: true,
      paymentId: mockOrder.id,
    })

    expect(mockSupabaseClient.from("orders").insert).toHaveBeenCalledTimes(1)
    expect(mockSupabaseClient.from("orders").insert).toHaveBeenCalledWith({
      type: "initial_setup",
      payment_status: "paid",
      session_id: "session_id",
      team_id: teamId,
      checkout_session_object: JSON.stringify(session),
    })

    expect(mockSupabaseClient.from("teams").update).toHaveBeenCalledTimes(1)
    expect(mockSupabaseClient.from("teams").update).toHaveBeenCalledWith({
      onboarding_status: "REQUEST_RECEIVED",
    })

    expect(teamUpdateQueries.eq).toHaveBeenCalledWith("id", teamId)
  })

  it("handles a checkout.session.async_payment_failed event", async () => {
    const teamId = 42
    const session = {
      id: "session_id",
      metadata: {
        team_id: String(teamId),
        product_type: "initial_setup",
      },
    }

    stripeMock.webhooks.constructEvent.mockImplementation(() => ({
      type: "checkout.session.async_payment_failed",
      data: { object: session },
    }))

    const req = new NextRequest("https://example.com", {
      method: "POST",
      body: "payload",
      headers: { "stripe-signature": "signature" },
    })

    const res = await POST(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      teamId,
      fulfilled: false,
    })
  })
})

import Stripe from "stripe"
import { ProductType } from "@/types/products"
import { createPaymentLink } from "@/actions/stripe/create-payment-link"

jest.mock("stripe")

const stripeSecretKey = "test_stripe_secret_key"
const productType: ProductType = "initial_setup"
const teamId = 42
const callbackUrl = "https://example.com/callback"

const stripeMock = {
  products: {
    retrieve: jest.fn(),
  },
  prices: {
    retrieve: jest.fn(),
  },
  paymentLinks: {
    create: jest.fn(),
  },
}

;(Stripe as unknown as jest.Mock).mockImplementation(() => stripeMock)

describe("createPaymentLink", () => {
  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = stripeSecretKey
    process.env.STRIPE_INITIAL_SETUP_PRODUCT_ID = "test_product_id"

    stripeMock.products.retrieve.mockReset()
    stripeMock.prices.retrieve.mockReset()
    stripeMock.paymentLinks.create.mockReset()
  })

  it("returns the session URL for a valid product", async () => {
    stripeMock.products.retrieve.mockResolvedValue({
      id: "test_product_id",
      default_price: "test_price_id",
    })

    stripeMock.prices.retrieve.mockResolvedValue({ id: "test_price_id" })
    stripeMock.paymentLinks.create.mockResolvedValue({
      url: "https://payment.link/session",
    })

    const result = await createPaymentLink(productType, teamId, callbackUrl)

    expect(result).toBe("https://payment.link/session")
    expect(stripeMock.products.retrieve).toHaveBeenCalledWith("test_product_id")
    expect(stripeMock.prices.retrieve).toHaveBeenCalledWith("test_price_id")
    expect(stripeMock.paymentLinks.create).toHaveBeenCalledWith({
      line_items: [
        {
          price: "test_price_id",
          quantity: 1,
        },
      ],
      after_completion: {
        type: "redirect",
        redirect: {
          url: callbackUrl,
        },
      },
      metadata: {
        team_id: teamId,
        product_type: productType,
      },
    })
  })

  it("throws an error if the Stripe secret key is not set", async () => {
    delete process.env.STRIPE_SECRET_KEY

    await expect(
      createPaymentLink(productType, teamId, callbackUrl),
    ).rejects.toThrow("Stripe secret key is not set")
  })

  it("throws an error if the product ID is not found", async () => {
    delete process.env.STRIPE_INITIAL_SETUP_PRODUCT_ID

    await expect(
      createPaymentLink(productType, teamId, callbackUrl),
    ).rejects.toThrow(`Product ID not found for type: ${productType}`)
  })

  it("throws an error if the product is not found", async () => {
    stripeMock.products.retrieve.mockResolvedValue(null)

    await expect(
      createPaymentLink(productType, teamId, callbackUrl),
    ).rejects.toThrow("Product not found: test_product_id")
  })

  it("throws an error if no default price is set for the product", async () => {
    stripeMock.products.retrieve.mockResolvedValue({
      id: "test_product_id",
      default_price: null,
    })

    await expect(
      createPaymentLink(productType, teamId, callbackUrl),
    ).rejects.toThrow("No default price set for product: test_product_id")
  })

  it("throws an error if the payment link creation fails", async () => {
    stripeMock.products.retrieve.mockResolvedValue({
      id: "test_product_id",
      default_price: "test_price_id",
    })

    stripeMock.prices.retrieve.mockResolvedValue({ id: "test_price_id" })
    stripeMock.paymentLinks.create.mockResolvedValue({ url: null })

    await expect(
      createPaymentLink(productType, teamId, callbackUrl),
    ).rejects.toThrow("No session URL returned")
  })
})

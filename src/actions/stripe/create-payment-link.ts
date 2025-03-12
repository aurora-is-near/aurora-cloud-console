"use server"

import Stripe from "stripe"
import { ProductMetadata, ProductType } from "@/types/products"
import { getStripeConfig } from "@/utils/stripe"

const getProductId = async (productType: ProductType) => {
  const { productIds } = await getStripeConfig()

  return productIds[productType]
}

const getPrice = async (
  stripe: Stripe,
  product: Stripe.Product,
): Promise<Stripe.Price | undefined | null> => {
  if (typeof product.default_price === "string") {
    return stripe.prices.retrieve(product.default_price)
  }

  return product.default_price
}

const getProductMetadata = <T extends ProductType>(
  productType: T,
): ProductMetadata[T] => {
  const productMetadata = {
    top_up: {
      number_of_transactions: 15000,
    },
  }[productType]

  return productMetadata
}

export const createPaymentLink = async (
  productType: ProductType,
  teamId: number,
  callbackUrl: string,
) => {
  const [{ secretKey }, productId] = await Promise.all([
    getStripeConfig(),
    getProductId(productType),
  ])

  if (!secretKey) {
    throw new Error("Stripe secret key is not set")
  }

  const stripe = new Stripe(secretKey)

  if (!productId) {
    throw new Error(`Product ID not found for type: ${productType}`)
  }

  const product = await stripe.products.retrieve(productId)

  if (!product) {
    throw new Error(`Product not found: ${productId}`)
  }

  const price = await getPrice(stripe, product)

  if (!price) {
    throw new Error(`No default price set for product: ${product.id}`)
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: callbackUrl,
    cancel_url: callbackUrl,
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    metadata: {
      team_id: teamId,
      product_type: productType,
      ...getProductMetadata(productType),
    },
  })

  if (!session.url) {
    throw new Error("No session URL returned")
  }

  return session.url
}

"use server"

import { featureFlags } from "@/feature-flags/server"
import { ProductType } from "@/types/products"

type StripeConfig = {
  secretKey?: string
  webhookSecret?: string
  productIds: Record<ProductType, string | undefined>
}

export const getStripeConfig = (): StripeConfig => {
  if (featureFlags.get("stripe_test_payments")) {
    return {
      secretKey: process.env.STRIPE_TEST_SECRET_KEY,
      webhookSecret: process.env.STRIPE_TEST_MODE_WEBHOOK_SECRET,
      productIds: {
        initial_setup: process.env.STRIPE_TEST_MODE_INITIAL_SETUP_PRODUCT_ID,
      },
    }
  }

  return {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    productIds: {
      initial_setup: process.env.STRIPE_INITIAL_SETUP_PRODUCT_ID,
    },
  }
}

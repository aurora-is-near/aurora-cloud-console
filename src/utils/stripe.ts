import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { featureFlags } from "@/feature-flags/server"
import { ProductType } from "@/types/products"
import { isAdminUser } from "@/utils/admin"

type StripeConfig = {
  secretKey?: string
  webhookSecret?: string
  productIds: Record<ProductType, string | undefined>
}

export const getStripeConfig = async (): Promise<StripeConfig> => {
  const authUser = await getAuthUser()
  const isAdmin = isAdminUser(authUser?.email)

  if (featureFlags.get("stripe_test_payments") && isAdmin) {
    return {
      secretKey: process.env.STRIPE_TEST_SECRET_KEY,
      webhookSecret: process.env.STRIPE_TEST_MODE_WEBHOOK_SECRET,
      productIds: {
        top_up: process.env.STRIPE_TEST_MODE_INITIAL_SETUP_PRODUCT_ID,
      },
    }
  }

  return {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    productIds: {
      top_up: process.env.STRIPE_INITIAL_SETUP_PRODUCT_ID,
    },
  }
}

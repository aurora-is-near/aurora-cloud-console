import { PRODUCT_TYPES } from "@/constants/products"

export type ProductType = (typeof PRODUCT_TYPES)[number]

export type ProductMetadata = {
  top_up: {
    number_of_transactions: number
  }
}

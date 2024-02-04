import {
  DealPrioritiesSchema,
  DealSchema,
  ListSchema,
  SiloSchema,
  WalletDetailsSchema,
} from "@/app/api/contract"
import { z } from "zod"

export type DealSchema = z.infer<typeof DealSchema>
export type DealPrioritiesSchema = z.infer<typeof DealPrioritiesSchema>
export type SiloSchema = z.infer<typeof SiloSchema>
export type ListSchema = z.infer<typeof ListSchema>
export type WalletDetailsSchema = z.infer<typeof WalletDetailsSchema>

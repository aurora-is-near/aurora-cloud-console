import {
  DealPrioritiesSchema,
  DealSchema,
  ListSchema,
  SiloSchema,
  SimpleListSchema,
  WalletDetailsSchema,
} from "@/app/api/contract"
import { z } from "zod"

export type DealSchema = z.infer<typeof DealSchema>
export type SiloSchema = z.infer<typeof SiloSchema>
export type ListSchema = z.infer<typeof ListSchema>
export type SimpleListSchema = z.infer<typeof SimpleListSchema>
export type WalletDetailsSchema = z.infer<typeof WalletDetailsSchema>

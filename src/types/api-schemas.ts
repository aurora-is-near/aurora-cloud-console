import { z } from "zod"
import * as contract from "@/app/api/contract"

export type DealSchema = z.infer<typeof contract.DealSchema>
export type SiloSchema = z.infer<typeof contract.SiloSchema>
export type TokenSchema = z.infer<typeof contract.TokenSchema>
export type ListSchema = z.infer<typeof contract.ListSchema>
export type SimpleListSchema = z.infer<typeof contract.SimpleListSchema>
export type WalletDetailsSchema = z.infer<typeof contract.WalletDetailsSchema>
export type TransactionDataSchema = z.infer<
  typeof contract.TransactionDataSchema
>
export type OracleSchema = z.infer<typeof contract.OracleSchema>
export type BridgeSchema = z.infer<typeof contract.BridgeSchema>

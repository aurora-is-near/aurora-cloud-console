import { z } from "zod"
import {
  BridgeSchema as Bridge,
  ChartDataSchema as ChartData,
  DealSchema as Deal,
  ListSchema as List,
  OracleSchema as Oracle,
  SiloSchema as Silo,
  SimpleListSchema as SimpleList,
  TokenSchema as Token,
  TransactionDataSchema as TransactionData,
  WalletDetailsSchema as WalletDetails,
} from "@/app/api/contract"

export type DealSchema = z.infer<typeof Deal>
export type SiloSchema = z.infer<typeof Silo>
export type TokenSchema = z.infer<typeof Token>
export type ListSchema = z.infer<typeof List>
export type SimpleListSchema = z.infer<typeof SimpleList>
export type WalletDetailsSchema = z.infer<typeof WalletDetails>
export type TransactionDataSchema = z.infer<typeof TransactionData>
export type ChartDataSchema = z.infer<typeof ChartData>
export type OracleSchema = z.infer<typeof Oracle>
export type BridgeSchema = z.infer<typeof Bridge>

import { z } from "zod"
import {
  ChartDataSchema as ChartData,
  DealSchema as Deal,
  OracleSchema as Oracle,
  RuleSchema as Rule,
  SiloSchema as Silo,
  SiloBridgedTokenSchema as SiloBridgedToken,
  SiloBridgedTokenRequestSchema as SiloBridgedTokenRequest,
  TransactionDataSchema as TransactionData,
  WalletDetailsSchema as WalletDetails,
  WidgetSchema as Widget,
} from "@/app/api/contract"

export type DealSchema = z.infer<typeof Deal>
export type RuleSchema = z.infer<typeof Rule>
export type SiloSchema = z.infer<typeof Silo>
export type SiloBridgedTokenSchema = z.infer<typeof SiloBridgedToken>
export type SiloBridgedTokenRequestSchema = z.infer<
  typeof SiloBridgedTokenRequest
>

export type WalletDetailsSchema = z.infer<typeof WalletDetails>
export type TransactionDataSchema = z.infer<typeof TransactionData>
export type ChartDataSchema = z.infer<typeof ChartData>
export type OracleSchema = z.infer<typeof Oracle>
export type WidgetSchema = z.infer<typeof Widget>

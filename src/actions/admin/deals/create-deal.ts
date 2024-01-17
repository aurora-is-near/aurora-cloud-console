"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { ProxyApiOperation } from "@/types/proxy-api"
import { Deal } from "@/types/types"
import { proxyApiClient } from "@/utils/proxy-api/request"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

type ProxyApiDealInputs = {
  userTtl?: number
  userPrepaidTtl?: number
}

const getBody = (
  customerId: string,
  dealId: string,
  { userTtl = 31536000, userPrepaidTtl = 0 }: ProxyApiDealInputs = {},
) => {
  const operations: ProxyApiOperation[] = [
    {
      // This template will be used for variables that keep total tx count for users of this deal
      op_type: "set_template",
      var_type: "number",
      template_key: `template::deal::acc::customers::${customerId}::deals::${dealId}::userTotalTxCount`,

      // OPTIONAL: make user total tx counter expire after some time
      // Hint: it's strongly recommended to have here same value as on previous steps
      expiration_duration: userTtl, // Seconds
      // MUST be true if expiration_duration > 0, otherwise it MUST be false
      touch_by_read: true,
    },
    {
      // This template will be used for variable that keep total tx count for this deal
      op_type: "set_template",
      var_type: "number",
      template_key: `template::deal::acc::customers::${customerId}::deals::${dealId}::dealTotalTxCount`,
    },
    {
      // This template will be used for variables that keep consumed renewing tx count for users of this deal
      // Fine-tuning for it will be described later.
      op_type: "set_template",
      var_type: "number",
      template_key: `template::deal::acc::customers::${customerId}::deals::${dealId}::consumedUserRenewingTx`,

      // Controls reset behavior. 0/0 means no reset. Can be modified later.
      reset_duration_months: 0,
      reset_duration_nanoseconds: 0,

      // OPTIONAL: make user consumed renewing tx counter expire after some time
      // Hint: it's strongly recommended to have here same value as on previous steps
      expiration_duration: userTtl, // Seconds
      // MUST be true if expiration_duration > 0, otherwise it MUST be false
      touch_by_read: true,
    },
    {
      // This template will be used for variables that keep consumed prepaid tx count for users of this deal
      op_type: "set_template",
      var_type: "number",
      template_key: `template::deal::acc::customers::${customerId}::deals::${dealId}::consumedUserPrepaidTx`,

      // OPTIONAL: make user consumed prepaid tx counter expire after some time
      expiration_duration: userPrepaidTtl, // Seconds
      // MUST be true if expiration_duration > 0, otherwise it MUST be false
      touch_by_read: true,
    },
    {
      // This template will be used for variables that keep total prepaid tx count for users of this deal
      op_type: "set_template",
      var_type: "number",
      template_key: `template::deal::acc::customers::${customerId}::deals::${dealId}::totalUserPrepaidTx`,

      // OPTIONAL: make user total prepaid tx counter expire after some time
      // Hint: it's strongly recommended to have here same value as on previous step
      expiration_duration: userPrepaidTtl, // Seconds
      // MUST be true if expiration_duration > 0, otherwise it MUST be false
      touch_by_read: true,
    },
    {
      // This template will be used for variable that does rate-limiting for deal auto-sub (will be described later).
      // This rate-limiter is disabled by default, but template should still exist for data consistency.
      // Fine-tuning for it will be described later.
      op_type: "set_template",
      var_type: "bucket",
      template_key: `template::deal::acc::customers::${customerId}::deals::${dealId}::autoSubRateLimiter`,

      // Just a reasonable default: 10000 auto-subs per day
      bucket_fill_value: 10000,
      leak_duration_nano: "86400000000", // (day / 10000 = 24h * 3600s * 1e9nanos / 10000)
    },
    {
      // This template will be used for variables that do per-IP rate-limiting for deal auto-sub (will be described later).
      // Those rate-limiters are disabled by default, but template must still exist for data consistency.
      // Fine-tuning for them will be described later.
      op_type: "set_template",
      var_type: "bucket",
      template_key: `template::deal::acc::customers::${customerId}::deals::${dealId}::autoSubIpRateLimiter`,

      // Just a reasonable default: 5 per-IP auto-subs per week
      bucket_fill_value: 5,
      leak_duration_nano: "120960000000000", // (week / 5 = 7d * 24h * 3600s * 1e9nanos / 5)

      // REQUIRED: make per-IP auto-sub rate-limiters expire after some time
      expiration_duration: 8640000, // Seconds. 100days is reasonable default, never put zero here.
      touch_by_read: true,
    },
    {
      // This variable will be used for enabling/disabling deal.
      // 0 means disabled, 1 means enabled. Default value: 0. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::enabled`,
      template_key: "template::deal::acc::featureFlag",
    },
    {
      // This variable will be used for enabling/disabling auto-subscription.
      // 0 means disabled, 1 means enabled. Default value: 0. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::autoSubEnabled`,
      template_key: "template::deal::acc::featureFlag",
    },
    {
      // This variable will be used for enabling/disabling auto-subscription rate-limiting.
      // 0 means disabled, 1 means enabled. Default value: 0. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::autoSubEnableRateLimit`,
      template_key: "template::deal::acc::featureFlag",
    },
    {
      // This variable will be used for enabling/disabling auto-subscription per-IP rate-limiting.
      // 0 means disabled, 1 means enabled. Default value: 0. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::autoSubEnablePerIpRateLimit`,
      template_key: "template::deal::acc::featureFlag",
    },
    {
      // This variable will be used for enabling/disabling user total tx restriction.
      // 0 means disabled, 1 means enabled. Default value: 0. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::restrictUserTotalTx`,
      template_key: "template::deal::acc::featureFlag",
    },
    {
      // This variable will be used for enabling/disabling deal total tx restriction.
      // 0 means disabled, 1 means enabled. Default value: 0. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::restrictDealTotalTx`,
      template_key: "template::deal::acc::featureFlag",
    },
    {
      // This variable will be used for enabling/disabling user renewing consumable transactions.
      // 0 means disabled, 1 means enabled. Default value: 0. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::enableUserRenewingTx`,
      template_key: "template::deal::acc::featureFlag",
    },
    {
      // This variable will be used for enabling/disabling user prepaid consumable transactions.
      // 0 means disabled, 1 means enabled. Default value: 0. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::enableUserPrepaidTx`,
      template_key: "template::deal::acc::featureFlag",
    },
    {
      // This variable will be used for linking arbitrary list as chain filter.
      // Empty by default (means no list is selected). Can be modified later.
      op_type: "set",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::chainFilter`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // This variable will be used for linking arbitrary list as contract filter.
      // Empty by default (means no list is selected). Can be modified later.
      op_type: "set",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::contractFilter`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // This variable will be used for linking arbitrary list as a list with revoked tokens.
      // Empty by default (means no list is selected). Can be modified later.
      op_type: "set",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::revokedTokens`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // This variable will be used for linking arbitrary list as userid filter.
      // Empty by default (means no list is selected). Can be modified later.
      op_type: "set",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::userIdFilter`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // This variable will be used for linking arbitrary list as userid blacklist.
      // Empty by default (means no list is selected). Can be modified later.
      op_type: "set",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::userIdBlacklist`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // This variable will be used for linking arbitrary list as EOA blacklist.
      // Empty by default (means no list is selected). Can be modified later.
      op_type: "set",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::eoaBlacklist`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // This variable will be used for linking arbitrary list as auto-subscription list.
      // Empty by default (means no list is selected). Can be modified later.
      op_type: "set",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::autoSubList`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // This variable will control maximum total tx for user (if such restriction is enabled).
      // 0 by default. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::maxUserTotalTx`,
      template_key: "template::deal::acc::txLimit",
    },
    {
      // This variable will control maximum total tx for deal (if such restriction is enabled).
      // 0 by default. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::maxDealTotalTx`,
      template_key: "template::deal::acc::txLimit",
    },
    {
      // This variable will control maximum renewing tx for user (if renewing txs are enabled).
      // 0 by default. Can be modified later.
      op_type: "set",
      var_type: "number",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::maxUserRenewingTx`,
      template_key: "template::deal::acc::txLimit",
    },
    {
      // This set will be used to iterate over user rate limiters for this deal.
      // User rate limiters are disabled by default, but this set must still exist for data consistency.
      op_type: "set",
      var_type: "set",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::userRateLimiters`,
      template_key: "template::deal::acc::execList",
    },
    {
      // This set will be used to iterate over rate limiters for this deal.
      // Deal rate limiters are disabled by default, but this set must still exist for data consistency.
      op_type: "set",
      var_type: "set",
      var_key: `deal::acc::customers::${customerId}::deals::${dealId}::dealRateLimiters`,
      template_key: "template::deal::acc::execList",
    },
  ]

  return JSON.stringify(operations)
}

/**
 * Create a deal via the ACC database and Proxy API.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#creating-a-deal
 */
export const createDeal = async (
  inputs: Omit<Deal, "id" | "created_at">,
): Promise<Deal> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .insert(inputs)
    .select("*, teams!inner(borealis_customer_id)")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  if (!result.data.teams?.borealis_customer_id) {
    throw new Error("No borealis_customer_id found")
  }

  const body = getBody(
    result.data.teams.borealis_customer_id,
    result.data.borealis_deal_id,
  )

  await proxyApiClient.update(body)

  return result.data
}

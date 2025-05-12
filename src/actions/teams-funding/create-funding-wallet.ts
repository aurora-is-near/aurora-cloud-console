"use server"

import { Wallet } from "ethers"
import Cryptr from "cryptr"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

const getCryptr = () => {
  const encryptionKey = process.env.TEAM_FUNDING_WALLET_ENCRYPTION_KEY

  if (!encryptionKey) {
    throw new Error("TEAM_FUNDING_WALLET_ENCRYPTION_KEY is not set.")
  }

  return new Cryptr(encryptionKey)
}

export const createTeamFundingWallet = async (
  teamId: number,
): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const fundingWallet = Wallet.createRandom()
  const { address } = fundingWallet
  const pk = fundingWallet.privateKey
  const cryptredPk = getCryptr()
  const result = await supabase
    .from("teams")
    .update({
      funding_wallet_address: address,
      funding_wallet_pk: cryptredPk.encrypt(pk),
    })
    .eq("id", teamId)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}

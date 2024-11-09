"use server"

import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"

export const addOracleToken = async (data: {
  symbol: string
  coinGeckoAlias: string
}) => auroraOracleApiClient.addToken(data)

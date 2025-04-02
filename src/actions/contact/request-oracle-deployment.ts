"use server"

import { Silo, Team } from "@/types/types"
import { createSiloOracle } from "@/actions/silo-oracle/create-silo-oracle"
import { notifyIntegrationRequest } from "./integration-request"

export const requestOracleDeployment = async (team: Team, silo: Silo) => {
  await notifyIntegrationRequest(team, silo, "oracle")

  return createSiloOracle({ silo_id: silo.id })
}

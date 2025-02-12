import { useCallback, useState } from "react"
import { assignSiloToTeam } from "@/actions/deployment/assign-silo-to-team"
import { logger } from "@/logger"
import { setBaseToken } from "@/actions/deployment/set-base-token"
import { Silo } from "@/types/types"
import { updateSilo } from "@/actions/silos/update-silo"

type SiloDeploymentStatus =
  | "NOT_STARTED"
  | "ASSIGNING_SILO"
  | "SETTING_BASE_TOKEN"
  | "STARTING_BLOCK_EXPLORER"
  | "DEPLOYMENT_COMPLETE"

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const useSiloDeployment = (teamId: number) => {
  const [status, setStatus] = useState<SiloDeploymentStatus>("NOT_STARTED")
  const [hasError, setHasError] = useState(false)

  const startDeployment = useCallback(async () => {
    // 1. Assign silo to team
    setStatus("ASSIGNING_SILO")

    let silo: Silo | null = null

    try {
      silo = await assignSiloToTeam(teamId)
    } catch (error) {
      logger.error(error)
      setHasError(true)

      return
    }

    await sleep(2000)

    // 2. Set base token
    setStatus("SETTING_BASE_TOKEN")

    try {
      await setBaseToken(silo)
    } catch (error) {
      logger.error(error)
      setHasError(true)

      return
    }

    await sleep(2000)

    // 3. Pretend to be starting the Block Explorer
    setStatus("STARTING_BLOCK_EXPLORER")

    await sleep(2000)

    // 4. If the above process succeeds we consider the deployment complete and
    // mark the silo as active
    await updateSilo(silo.id, { is_active: true })
  }, [teamId])

  return { startDeployment, status, hasError }
}

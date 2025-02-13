import { useCallback, useEffect, useState } from "react"
import { logger } from "@/logger"
import { setBaseToken } from "@/actions/deployment/set-base-token"
import { Silo } from "@/types/types"
import { updateSilo } from "@/actions/silos/update-silo"

type SiloDeploymentStatus =
  | "INITIALIZING"
  | "SETTING_BASE_TOKEN"
  | "STARTING_BLOCK_EXPLORER"
  | "DEPLOYMENT_COMPLETE"

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const useSiloConfiguration = (silo: Silo) => {
  const [status, setStatus] = useState<SiloDeploymentStatus>(
    silo.is_active ? "DEPLOYMENT_COMPLETE" : "INITIALIZING",
  )

  const [hasError, setHasError] = useState(false)

  const startConfiguration = useCallback(async () => {
    await sleep(2000)

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
    setStatus("DEPLOYMENT_COMPLETE")
  }, [silo])

  useEffect(() => {
    void startConfiguration()
  }, [startConfiguration])

  return { status, hasError }
}

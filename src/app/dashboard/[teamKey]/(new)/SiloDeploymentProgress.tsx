"use client"

import { useSiloConfiguration } from "@/hooks/useSiloConfiguration"
import { Silo } from "@/types/types"

type SiloDeploymentProgressProps = {
  silo: Silo
}

export const SiloDeploymentProgress = ({
  silo,
}: SiloDeploymentProgressProps) => {
  const { status } = useSiloConfiguration(silo)

  return <p>{status}</p>
}

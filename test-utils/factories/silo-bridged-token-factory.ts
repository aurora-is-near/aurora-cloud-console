import { SiloBridgedToken } from "@/types/types"
import { createMockBridgedToken } from "./bridged-token-factory"

export const createMockSiloBridgedToken = (
  data: Partial<SiloBridgedToken> = {},
): SiloBridgedToken => {
  const { is_deployment_pending: isDeploymentPending, ...tokenProps } = data

  return {
    ...createMockBridgedToken(tokenProps),
    is_deployment_pending: isDeploymentPending ?? false,
  }
}

export const createMockSiloBridgedTokens = (
  count: number,
  data?: Partial<SiloBridgedToken>,
): SiloBridgedToken[] =>
  Array.from({ length: count }, (_, index) =>
    createMockSiloBridgedToken({
      id: index + 1,
      name: `Test Token ${index + 1}`,
      ...data,
    }),
  )

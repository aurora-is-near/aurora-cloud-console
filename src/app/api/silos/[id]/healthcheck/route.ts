import { Block, JsonRpcProvider, Network } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { abort } from "@/utils/abort"
import { checkToken } from "@/utils/check-token-contract"
import { Silo } from "@/types/types"

const DEFAULT_TOKENS = ["NEAR", "wNEAR", "USDt", "USDC", "AURORA"] as const
const STALLED_THRESHOLD = 60

/**
 * Check that all of the expected default tokens were deployed.
 */
const checkDefaultTokens = async (provider: JsonRpcProvider) => {
  const supportedTokens = await Promise.all(
    DEFAULT_TOKENS.map(async (symbol) => checkToken(provider, symbol)),
  )

  return DEFAULT_TOKENS.reduce<
    Record<(typeof DEFAULT_TOKENS)[number], boolean>
  >(
    (acc, symbol, index) => ({
      ...acc,
      [symbol]: supportedTokens[index],
    }),
    {
      NEAR: false,
      wNEAR: false,
      USDt: false,
      USDC: false,
      AURORA: false,
    },
  )
}

/**
 * Check for stalled node (block timestamp too old).
 */
const hasStalledNodes = (latestBlock: Block | null) => {
  const lastBlockTime = latestBlock?.timestamp ?? 0
  const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds

  return currentTime - lastBlockTime > STALLED_THRESHOLD
}

const getStatus = ({
  silo,
  network,
  latestBlock,
}: {
  silo: Silo
  network: Network
  latestBlock: Block | null
}): "ok" | "invalid-network" | "stalled" => {
  const isNetworkValid = Number(network.chainId.toString()) === silo.chain_id

  if (!isNetworkValid) {
    return "invalid-network"
  }

  if (hasStalledNodes(latestBlock)) {
    return "stalled"
  }

  return "ok"
}

export const GET = createApiEndpoint("healthcheck", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const provider = new JsonRpcProvider(silo.rpc_url)

  const [defaultTokenContractsDeployed, latestBlock, network] =
    await Promise.all([
      checkDefaultTokens(provider),
      provider.getBlock("latest"),
      provider.getNetwork(),
    ])

  return {
    networkStatus: getStatus({ silo, network, latestBlock }),
    defaultTokenContractsDeployed,
  }
})

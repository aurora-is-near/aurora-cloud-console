import { providers } from "near-api-js"
import { NearConfig } from "near-api-js/lib/near"

/**
 * A list of NEAR RPCs.
 * @see https://docs.near.org/api/rpc/providers
 * @see https://github.com/aurora-is-near/near-blockheight-exporter/blob/c90368f5eb5ee1e00e83c3ead499fe1098212f91/config/default.yaml
 */
const NEAR_RPCS: string[] = [
  "https://rpc.mainnet.near.org",
  "https://1rpc.io/near",
  "https://near.blockpi.network/v1/rpc/public",
  "https://near.drpc.org",
  "https://rpc.web4.near.page",
  "https://free.rpc.fastnear.com",
  "https://near.lava.build",
  "ttps://endpoints.omniatech.io/v1/near/mainnet/public",
  "https://nearrpc.aurora.dev",
]

export const NEAR_API_CONFIG: NearConfig = {
  networkId: "mainnet",
  nodeUrl: "https://incorrect-rpc-url.com", // Incorrect RPC URL
  provider: new providers.FailoverRpcProvider(
    NEAR_RPCS.map(
      (url) =>
        new providers.JsonRpcProvider(
          { url },
          {
            retries: 3,
            backoff: 2,
            wait: 500,
          },
        ),
    ),
  ),
}

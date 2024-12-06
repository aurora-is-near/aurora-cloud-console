import { Silo } from "@/types/types"

/**
 * Get the NEAR relayer account ID for a given silo.
 *
 * For all of our custom Aurora chains the relayer account is simply the engine
 * account, for example:
 * @see https://explorer.near.org/accounts/0x4e45415d.c.aurora (Rhodes)
 * @see https://explorer.near.org/accounts/0x4e45415e.c.aurora (Hypberbolic)
 * @see https://explorer.near.org/accounts/0x4e45415f.c.aurora (Turbo)
 *
 * In some cases we may need to override this with a custom account, for Aurora
 * networks, for example:
 * @see https://explorer.near.org/accounts/relayer.aurora
 */
export const getRelayerAccount = (silo: Silo): string => {
  if (["1313161554", "1313161555"].includes(silo.chain_id)) {
    return "relay.aurora"
  }

  return silo.engine_account
}

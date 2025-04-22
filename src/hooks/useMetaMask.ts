import { useCallback } from "react"
import { useModals } from "@/hooks/useModals"
import { Silo } from "@/types/types"
import { Modals } from "@/utils/modals"

export const useMetaMask = () => {
  const { openModal } = useModals()

  const openDownloadModal = useCallback(() => {
    openModal(Modals.MetaMaskNotInstalled)
  }, [openModal])

  const watchAsset = useCallback(
    async (options: { address: string; symbol: string; decimals?: number }) => {
      if (!window.ethereum) {
        openDownloadModal()

        return
      }

      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options,
        },
      })
    },
    [openDownloadModal],
  )

  const addEthereumChain = useCallback(
    async (silo: Silo) => {
      if (!window.ethereum) {
        openDownloadModal()

        return
      }

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${Number(silo.chain_id).toString(16)}`,
            chainName: silo.name,
            nativeCurrency: {
              symbol: silo.base_token_symbol,
              decimals: silo.base_token_decimals,
            },
            rpcUrls: [`https://${silo.rpc_url.replace(/^[^:]*:\/\//, "")}`],
            blockExplorerUrls: silo.explorer_url ? [silo.explorer_url] : [],
          },
        ],
      })
    },
    [openDownloadModal],
  )

  return {
    watchAsset,
    addEthereumChain,
  }
}

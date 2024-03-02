import { useModals } from "@/hooks/useModals"
import { Silo, Token } from "@/types/types"
import { Modals } from "@/utils/modals"
import { useCallback } from "react"

const DECIMALS = 18

export const useMetaMask = () => {
  const { openModal } = useModals()

  const openDownloadModal = useCallback(() => {
    openModal(Modals.MetaMaskNotInstalled)
  }, [openModal])

  const watchAsset = useCallback(
    async (token: Token) => {
      if (!window.ethereum) {
        openDownloadModal()

        return
      }

      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: token.type,
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: DECIMALS,
          },
        },
      })
    },
    [openDownloadModal],
  )

  const addEthereumChain = useCallback(
    async (silo: Silo, baseToken: Token) => {
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
              symbol: baseToken.symbol,
              decimals: DECIMALS,
            },
            rpcUrls: [`https://${silo.rpc_url.replace(/^[^:]*:\/\//, "")}`],
            blockExplorerUrls: ["https://etherscan.io"],
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

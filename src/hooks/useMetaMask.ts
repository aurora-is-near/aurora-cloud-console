import { useModals } from "@/hooks/useModals"
import { TokenType } from "@/types/types"
import { Modals } from "@/utils/modals"
import { useCallback } from "react"

type WatchAssetOptions = {
  address: string
  symbol: string
  decimals: number
  image?: string
}

export const useMetaMask = () => {
  const { openModal } = useModals()

  const openDownloadModal = useCallback(() => {
    openModal(Modals.MetaMaskNotInstalled)
  }, [openModal])

  const watchAsset = useCallback(
    async (type: TokenType, options: WatchAssetOptions) => {
      if (!window.ethereum) {
        openDownloadModal()

        return
      }

      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type,
          options,
        },
      })
    },
    [openDownloadModal],
  )

  return {
    watchAsset,
  }
}

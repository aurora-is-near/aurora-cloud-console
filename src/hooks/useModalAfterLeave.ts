import { useCallback } from "react"
import { useModals } from "@/hooks/useModals"

export const useModalAfterLeave = () => {
  const { activeModal } = useModals()

  // Clear query parameters after closing the modal, unless another modal was
  // opened from the first, in which case we may want those parameters to
  // persist and any clearing should be handled manually.
  const afterLeave = useCallback(() => {
    if (!activeModal) {
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [activeModal])

  return { afterLeave }
}

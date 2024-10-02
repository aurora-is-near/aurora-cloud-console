"use client"

import Modal from "@/components/Modal"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { MetaMask } from "@/components/icons"
import { LinkButton } from "@/components/LinkButton"

export const MetaMaskNotInstalledModal = () => {
  const { closeModal, activeModal } = useModals()

  return (
    <Modal
      title="MetaMask Not Installed"
      open={activeModal === Modals.MetaMaskNotInstalled}
      close={closeModal}
    >
      <div className="flex flex-col items-center justify-center mt-6 text-center">
        <MetaMask className="w-12 h-12 text-red-600 mb-3" aria-hidden="true" />
        <p className="text-sm leading-5 text-slate-500">
          MetaMask is an extension for accessing Ethereum enabled distributed
          applications from your browser.
        </p>
        <LinkButton
          href="https://metamask.io/download/"
          target="_blank"
          className="mt-6"
          variant="primary"
          onClick={closeModal}
        >
          Download MetaMask
        </LinkButton>
      </div>
    </Modal>
  )
}

"use client"

import { notifyIntegrationRequest } from "@/actions/contact/integration-request"
import { Button } from "@/components/Button"
import ContactModal from "@/components/ContactModal"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

type RequestIntegrationButtonProps = {
  integrationType: string
}

export const RequestIntegrationButton = ({
  integrationType,
}: RequestIntegrationButtonProps) => {
  const { openModal } = useModals()

  const onClick = () => {
    openModal(Modals.Contact)
  }

  const onSumbit = async ({
    subject,
    message,
    telegramHandle,
  }: {
    subject: string
    message: string
    telegramHandle?: string
  }) => {
    await notifyIntegrationRequest({
      subject,
      integrationType,
      extraDetails: [
        `*Telegram handle:*\n${`@${telegramHandle}`.replace(/^@@/g, "@")}`,
        `*Message:*\n${message}`,
      ],
    })
  }

  return (
    <>
      <Button
        onClick={onClick}
        variant="border"
        size="lg"
        className="mt-6 lg:mt-0 lg:absolute right-0 top-0 text-slate-900 dark:text-slate-50"
      >
        Request integration
      </Button>
      <ContactModal
        includeTelegramHandle
        submitButtonText="Submit request"
        title="Request integration"
        subject="Marketplace integration request"
        onSubmit={onSumbit}
      />
    </>
  )
}

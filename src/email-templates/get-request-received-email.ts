import { MEETING_LINK } from "@/constants/meeting"
import { getEmailFromTemplate } from "@/email-templates/get-email-from-template"

export const getRequestReceivedEmail = () =>
  getEmailFromTemplate({
    title: "Your request was received",
    body: "We are preparing to configure your chain and we’ll be soon in touch.",
    button: {
      text: "Book a call",
      href: MEETING_LINK,
    },
    link: {
      text: "or go to your dashboard",
      href: "https://app.auroracloud.dev/dashboard",
    },
    progress: {
      currentStep: 1,
      numberOfSteps: 3,
    },
  })

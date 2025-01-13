import { getEmailFromTemplate } from "@/email-templates/get-email-from-template"

export const getDeploymentDoneEmail = () =>
  getEmailFromTemplate({
    title: "Your chain is live!",
    body: "We’ll help you deploy the chosen integrations next.",
    button: {
      text: "Go to dashboard",
      href: "https://app.auroracloud.dev/dashboard",
    },
    progress: {
      currentStep: 3,
      numberOfSteps: 3,
    },
  })

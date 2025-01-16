import { getEmailFromTemplate } from "@/email-templates/get-email-from-template"

export const getDeploymentInProgressEmail = () =>
  getEmailFromTemplate({
    title: "Deployment started",
    body: "It’s a matter of 2-3 days only before your chain is completely operational.",
    button: {
      text: "Go to dashboard",
      href: "https://app.auroracloud.dev/dashboard",
    },
    progress: {
      currentStep: 2,
      numberOfSteps: 3,
    },
  })

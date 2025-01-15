import { notFound } from "next/navigation"
import { getRequestReceivedEmail } from "@/email-templates/get-request-received-email"
import { getDeploymentDoneEmail } from "@/email-templates/get-deployment-done-email"
import { getDeploymentInProgressEmail } from "@/email-templates/get-deployment-in-progress-email"

const Page = ({ params: { type } }: { params: { type: string } }) => {
  const email = {
    requestReceived: getRequestReceivedEmail(),
    deploymentInProgress: getDeploymentInProgressEmail(),
    deploymentDone: getDeploymentDoneEmail(),
  }[type]

  if (!email) {
    notFound()
  }

  return <iframe title="email" srcDoc={email} className="w-full h-full" />
}

export default Page

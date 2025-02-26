import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { OnboardingReportDownloadButton } from "./OnboardingReportDownloadButton"

const Page = () => {
  return (
    <DashboardPage heading="Reports">
      <Card>
        <Card.Title>Onboarding</Card.Title>
        <Card.Subtitle>Download the onboarding report.</Card.Subtitle>
        <Card.Body>
          <OnboardingReportDownloadButton />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page

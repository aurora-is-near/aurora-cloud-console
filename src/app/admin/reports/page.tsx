import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { SilosReportDownloadButton } from "@/app/admin/reports/SilosReportDownloadButton"
import { OnboardingReportDownloadButton } from "./OnboardingReportDownloadButton"

const Page = () => {
  return (
    <DashboardPage heading="Reports">
      <div className="grid md:grid-cols-2 md:gap-8 gap-4">
        <Card>
          <Card.Title>Onboarding</Card.Title>
          <Card.Subtitle>Download the onboarding report.</Card.Subtitle>
          <Card.Body>
            <OnboardingReportDownloadButton />
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>Silos</Card.Title>
          <Card.Subtitle>Download the silos report.</Card.Subtitle>
          <Card.Body>
            <SilosReportDownloadButton />
          </Card.Body>
        </Card>
      </div>
    </DashboardPage>
  )
}

export default Page

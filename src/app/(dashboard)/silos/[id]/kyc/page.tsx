import Button from "@/components/Button"
import Card from "@/components/Card"
import InfoList from "@/components/InfoList"
import { Cog6ToothIcon } from "@heroicons/react/20/solid"
import Charts from "./Charts"
import { Suspense } from "react"
import ChartsLoader from "@/components/ChartsLoader"
import { DashboardPage } from "@/components/DashboardPage"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <Suspense fallback={<ChartsLoader />}>
        <Charts siloId={Number(id)} />
      </Suspense>

      <Card tag="section">
        <Card.Title tag="h4">Settings</Card.Title>

        <InfoList>
          <InfoList.Item term="KYC status" description="Enabled" />
          <InfoList.Item
            term="KYC link"
            description="business.auroracloud.dev"
            showCopyButton
          />
          <InfoList.Item
            term="KYC admin"
            description="kycplatform.com"
            showCopyButton
          />
        </InfoList>
      </Card>

      <Card tag="section">
        <Card.Title tag="h4">Profile</Card.Title>
        <Card.Subtitle>
          Select which users should benefit from this deal.
        </Card.Subtitle>
        <Card.Actions>
          <Button>
            <Cog6ToothIcon className="h-5 w-5" />
            Manage
          </Button>
        </Card.Actions>

        <InfoList className="border-y pt-5">
          <InfoList.Item
            term="Countries allowed"
            description="Belarus, Canada, China, Russia, Ukraine, United Kingdom, United States"
          />
          <InfoList.Item term="Age" description="over 18 years old" />
          <InfoList.Item term="Accredited investor" description="True" />
        </InfoList>

        <InfoList className="pt-5">
          <InfoList.Item term="Number of matches" description="~456 users" />
        </InfoList>
      </Card>
    </DashboardPage>
  )
}

export default Page

import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import Button from "@/components/Button"
import Card from "@/components/Card"
import InfoList from "@/components/InfoList"
import TabCharts from "@/components/TabCharts"
import { getSiloById } from "@/mockApi"
import { Cog6ToothIcon } from "@heroicons/react/20/solid"
import { notFound } from "next/navigation"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const silo = await getSiloById(id)

  if (!silo) notFound()

  return (
    <div className="space-y-4 sm:space-y-5">
      <section>
        <TabCharts
          tabs={[
            {
              title: "KYC",
              value: "2,778",
              chart: <></>,
              legend: ["Success", "Rejection"],
            },
            {
              title: "KYB",
              value: "1,201",
              chart: <></>,
              legend: ["Success", "Rejection"],
            },
          ]}
        >
          <BreadcrumbHeading titles={[silo.name, "KYC"]} />
        </TabCharts>
      </section>

      <Card tag="section">
        <Card.Title tag="h4">Settings</Card.Title>

        <InfoList>
          <InfoList.Item
            term="KYC status"
            description="Enabled"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <InfoList.Item
            term="KYC link"
            description="business.auroracloud.dev"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            showCopyButton
          />
          <InfoList.Item
            term="KYC admin"
            description="kycplatform.com"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <InfoList.Item
            term="Age"
            description="over 18 years old"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <InfoList.Item
            term="Accredited investor"
            description="True"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        </InfoList>

        <InfoList className="pt-5">
          <InfoList.Item
            term="Number of matches"
            description="~456 users"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        </InfoList>
      </Card>
    </div>
  )
}

export default Page

import { FeatureFlagsForm } from "@/app/admin/feature-flags/FeatureFlagsForm"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"

const Page = () => {
  return (
    <DashboardPage heading="Feature flags">
      <Card>
        <FeatureFlagsForm />
      </Card>
    </DashboardPage>
  )
}

export default Page

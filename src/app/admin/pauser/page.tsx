import { DashboardPage } from "@/components/DashboardPage"
import PauseForm from "./PauseForm"

const Page = async () => {
  return (
    <DashboardPage heading="Pauser" headingSize="lg" className="pt-12">
      <PauseForm />
    </DashboardPage>
  )
}

export default Page

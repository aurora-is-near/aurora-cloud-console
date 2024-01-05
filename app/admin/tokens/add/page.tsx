import Card from "@/components/Card"
import { TokenForm } from "@/app/admin/tokens/TokenForm"
import { AdminPage } from "@/components/AdminPage"

const Page = async () => {
  return (
    <AdminPage title="Add token">
      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <div className="px-6 pb-7">
          <TokenForm />
        </div>
      </Card>
    </AdminPage>
  )
}

export default Page

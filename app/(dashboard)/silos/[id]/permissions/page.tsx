import Card from "@/components/Card"
import TransactionAccessList from "./TransactionAccessList"
import DeployAccessList from "./DeployAccessList"
import AddListButton from "./AddListButton"
import { Suspense } from "react"
import Header from "./Header"
import Loader from "@/components/Loader"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      <Suspense fallback={<Loader className="h-7 sm:h-8 rounded-md !mt-0" />}>
        <Header siloId={id} />
      </Suspense>

      <Card tag="section">
        <Card.Title tag="h4">Transactions access</Card.Title>
        <Card.Actions>
          <AddListButton />
        </Card.Actions>
        <TransactionAccessList />
      </Card>

      <Card tag="section">
        <Card.Title>Deploy contracts access</Card.Title>
        <Card.Actions>
          <AddListButton />
        </Card.Actions>
        <DeployAccessList />
      </Card>
    </div>
  )
}

export default Page

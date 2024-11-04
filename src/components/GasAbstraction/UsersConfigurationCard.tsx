import Card from "@/components/Card"
import { RadioInput } from "@/components/RadioInput"

const UsersConfigurationCard = () => {
  return (
    <div className="xl:w-1/2">
      <Card tag="section" borderRadius="xl">
        <div className="flex flex-row justify-between">
          <RadioInput id="user" name="user" label="All users" />
        </div>
      </Card>
    </div>
  )
}

export default UsersConfigurationCard

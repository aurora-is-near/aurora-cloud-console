import Card from "@/components/Card"
import { InfoList, InfoListProps } from "@/components/InfoList"

type ConfigurationCardProps = {
  title: string
  description: string
  items: InfoListProps["items"]
}

export const ConfigurationCard = ({
  title,
  description,
  items,
}: ConfigurationCardProps) => {
  return (
    <Card borderRadius="xl" tag="section">
      <div className="flex flex-col xl:flex-row xl:gap-x-6">
        <div className="xl:w-1/2 xl:pr-10">
          <Card.Title tag="h2">{title}</Card.Title>
          <p className="text-slate-500 text-sm my-2">{description}</p>
        </div>
        <InfoList items={items} className="pt-4 pb-2" />
      </div>
    </Card>
  )
}

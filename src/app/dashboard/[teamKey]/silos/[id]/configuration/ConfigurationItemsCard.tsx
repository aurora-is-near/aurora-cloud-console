import { ConfigurationCard } from "@/components/ConfigurationCard"
import { InfoList, InfoListProps } from "@/components/InfoList"

export type ConfigurationItemsCardProps = {
  title: string
  description: string
  items: InfoListProps["items"]
}

export const ConfigurationItemsCard = ({
  title,
  description,
  items,
}: ConfigurationItemsCardProps) => {
  return (
    <ConfigurationCard title={title} description={description}>
      <InfoList items={items} className="pt-4 pb-2" />
    </ConfigurationCard>
  )
}

import { ReactNode } from "react"
import { ConfigurationCard } from "@/components/ConfigurationCard"
import { InfoList, InfoListProps } from "@/components/InfoList"

export type ConfigurationItemsCardProps = {
  title: string
  description: string
  belowDescription?: ReactNode
  items: InfoListProps["items"]
}

export const ConfigurationItemsCard = ({
  title,
  description,
  belowDescription,
  items,
}: ConfigurationItemsCardProps) => {
  return (
    <ConfigurationCard
      title={title}
      description={description}
      belowDescription={belowDescription}
    >
      <InfoList items={items} className="pt-4 pb-2" />
    </ConfigurationCard>
  )
}

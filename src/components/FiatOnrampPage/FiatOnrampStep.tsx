import Card from "@/components/Card"
import { BulletPoint } from "@/components/FiatOnrampPage/BulletPoint"

export const FiatOnrampStep = ({
  number,
  description,
  action,
}: {
  number: string | number
  description: string
  action: React.ReactNode
}) => {
  return (
    <Card className="p-2 md:p-2">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row justify-between items-center gap-2">
          <BulletPoint>{number}</BulletPoint>
          <span className="text-sm font-bold">{description}</span>
        </div>
        {action}
      </div>
    </Card>
  )
}

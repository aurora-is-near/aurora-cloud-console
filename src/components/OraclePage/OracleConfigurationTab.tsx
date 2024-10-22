"use client"

import { Button } from "@/components/Button"
import RequestOraclePriceFeedModal from "@/components/OraclePage/RequestOraclePriceFeedModal"
import { TabCard } from "@/components/TabCard/TabCard"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

export const OracleConfigurationTab = ({ siloId }: { siloId: number }) => {
  const { openModal } = useModals()
  const onClick = () => {
    openModal(Modals.RequestOraclePriceFeed)
  }

  return (
    <TabCard>
      <div className="flex flex-col gap-2 text-[16px] text-slate-500">
        <p>Price feeds</p>
        <Button onClick={onClick}>Request Price Feed</Button>
      </div>
      <RequestOraclePriceFeedModal siloId={siloId} />
    </TabCard>
  )
}

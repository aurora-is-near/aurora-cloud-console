"use client"

import { AuroraOracleToken } from "@/types/aurora-oracle-api"
import { ConfigurationCard } from "@/components/ConfigurationCard"
import { AddButton } from "@/components/AddButton"
import { Pill } from "@/components/Pill"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import ContactModal from "@/components/ContactModal"

type OracleConfigurationTabProps = {
  teamKey: string
  tokens?: AuroraOracleToken[]
}

export const OracleConfigurationTab = ({
  teamKey,
  tokens,
}: OracleConfigurationTabProps) => {
  const { openModal } = useModals()
  const onRequestNewTokenClick = () => {
    openModal(Modals.Contact)
  }

  return (
    <>
      <ConfigurationCard
        title="Supported tokens"
        description="We already support some tokens. You can request custom price feeds to your oracle before deployment."
      >
        <div className="xl:w-1/2 flex flex-col gap-2">
          <div className="border border-slate-200 rounded-md p-3 flex flex-row flex-1 justify-between gap-x-2">
            {!tokens?.length ? (
              <p className="text-sm text-slate-500">No supported tokens yet</p>
            ) : (
              <div className="flex flex-row flex-wrap gap-2">
                {tokens.map((token) => (
                  <Pill variant="active" size="lg" key={token.id}>
                    {token.symbol}
                  </Pill>
                ))}
              </div>
            )}
          </div>
          <AddButton
            text="Request new token"
            onClick={onRequestNewTokenClick}
          />
        </div>
      </ConfigurationCard>
      <ContactModal teamKey={teamKey} />
    </>
  )
}

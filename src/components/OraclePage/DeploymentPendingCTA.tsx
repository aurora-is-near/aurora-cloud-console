import { RocketLaunchIcon } from "@heroicons/react/20/solid"
import { NoDataCta } from "@/components/NoDataCta"
import { TabCard } from "@/components/TabCard/TabCard"
import { ContactButton } from "@/components/ContactButton"

export const DeploymentPendingCta = ({ teamKey }: { teamKey: string }) => {
  return (
    <TabCard>
      <NoDataCta
        title="Deployment pending"
        description="Your Oracle is being deployed. Please check back later, or contact support if you have any questions."
        Icon={RocketLaunchIcon}
        className="mx-auto max-w-[320px] py-6"
      >
        <ContactButton teamKey={teamKey} />
      </NoDataCta>
    </TabCard>
  )
}

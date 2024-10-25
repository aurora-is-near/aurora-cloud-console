import { ReactNode } from "react"
import { TabCard } from "@/components/TabCard/TabCard"

interface ConfigurationPanelProps {
  children: ReactNode
}

const ConfigurationPanel = ({ children }: ConfigurationPanelProps) => {
  return (
    <TabCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">{children}</div>
    </TabCard>
  )
}

export default ConfigurationPanel

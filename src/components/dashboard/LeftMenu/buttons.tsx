import Button from "@/components/v2/Button"

import {
  IconBlockExplorer,
  IconConfig,
  IconDashboard,
  IconGas,
  IconMarketplace,
  IconMonitoring,
  IconOnramp,
  IconOracle,
} from "../../../../../public/static/v2/images/menuIcons/index"

export const mainMenuButtons = (teamKey?: string) => {
  if (!teamKey) {
    return []
  }

  return [
    <Button
      className="text-slate-500"
      title="Dashboard"
      key="Dashboard"
      path={`/dashboard_v2/${teamKey}`}
      icon={<IconDashboard className="h-7 w-7" />}
    />,
    <Button
      className="text-slate-500"
      title="Monitoring"
      key="Monitoring"
      path={`/dashboard_v2/${teamKey}/monitoring`}
      icon={<IconMonitoring className="h-7 w-7" />}
    />,
    <Button
      className="text-slate-500"
      title="Configuration"
      key="Configuration"
      path={`/dashboard_v2/${teamKey}/configuration`}
      icon={<IconConfig className="h-7 w-7" />}
    />,
    <Button
      className="text-slate-500"
      title="Gas Abstraction"
      key="Gas Abstraction"
      path={`/dashboard_v2/${teamKey}/gas_abstraction`}
      icon={<IconGas className="h-7 w-7" />}
    />,
    <Button
      title="Integrations"
      key="Integrations"
      path={`/dashboard_v2/${teamKey}/integrations`}
      className="text-slate-500"
      icon={<IconMarketplace className="h-7 w-7" />}
    />,
  ]
}

export const stackMenuButtons = (teamKey?: string) => {
  if (!teamKey) {
    return []
  }

  return [
    <Button
      title="Onramp"
      key="Onramp"
      path={`/dashboard_v2/${teamKey}/onramp`}
      className="text-slate-500"
      bordered
      icon={<IconOnramp className="h-7 w-7" />}
    />,
    <Button
      title="Oracle"
      key="Oracle"
      path={`/dashboard_v2/${teamKey}/oracle`}
      className="text-slate-500"
      bordered
      icon={<IconOracle className="h-7 w-7" />}
    />,
    <Button
      title="Block explorer"
      key="Block explorer"
      path={`/dashboard_v2/${teamKey}/block_explorer`}
      className="text-slate-500"
      bordered
      icon={<IconBlockExplorer className="h-7 w-7" />}
    />,
  ]
}

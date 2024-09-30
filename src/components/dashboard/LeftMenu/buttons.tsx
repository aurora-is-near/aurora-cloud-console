import Button from "@/components/dashboard/Button"

import {
  IconConfig,
  IconDashboard,
  IconGas,
  IconMarketplace,
  IconMonitoring,
} from "../../../../public/static/v2/images/menuIcons/index"

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

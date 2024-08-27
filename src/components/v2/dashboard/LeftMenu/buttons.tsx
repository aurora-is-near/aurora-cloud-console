import Image from "next/image"
import Button from "@/components/v2/Button"

import {
  IconBlockExplorer,
  IconBridge,
  IconCEXwithdraw,
  IconConfig,
  IconDashboard,
  IconGas,
  IconMarketplace,
  IconMonitoring,
  IconOnramp,
  IconOracle,
  IconPlus,
} from "../../../../../public/static/v2/images/menuIcons/index"

export const mainMenuButtons = (teamKey?: string) => {
  if (!teamKey) {
    return []
  }

  return [
    <Button
      title="Create Aurora Chain"
      key="Create Aurora Chain"
      path={`/dashboard/${teamKey}/create_chain`}
      className="bg-slate-900 text-slate-100 hover:bg-slate-800"
      icon={<IconPlus className="h-4 w-4" />}
    />,
    <Button
      className="text-slate-500"
      title="Dashboard"
      key="Dashboard"
      path={`/dashboard/${teamKey}`}
      icon={<IconDashboard className="h-7 w-7" />}
    />,
    <Button
      className="text-slate-500"
      title="Monitoring"
      key="Monitoring"
      path={`/dashboard/${teamKey}/monitoring`}
      icon={<IconMonitoring className="h-7 w-7" />}
    />,
    <Button
      className="text-slate-500"
      title="Configuration"
      key="Configuration"
      path={`/dashboard/${teamKey}/configuration`}
      icon={<IconConfig className="h-7 w-7" />}
    />,
    <Button
      className="text-slate-500"
      title="Gas Abstraction"
      key="Gas Abstraction"
      path={`/dashboard/${teamKey}/gas_abstraction`}
      icon={<IconGas className="h-7 w-7" />}
    />,
  ]
}

export const stackMenuButtons = (teamKey?: string) => {
  if (!teamKey) {
    return []
  }

  return [
    <Button
      title="Bridge"
      key="Bridge"
      path={`/dashboard/${teamKey}/bridge`}
      className="text-slate-500"
      bordered
      icon={<IconBridge className="h-7 w-7" />}
    />,
    <Button
      title="Oracle"
      key="Oracle"
      path={`/dashboard/${teamKey}/oracle`}
      className="text-slate-500"
      bordered
      icon={<IconOracle className="h-7 w-7" />}
    />,
    <Button
      title="Onramp"
      key="Onramp"
      path={`/dashboard/${teamKey}/onramp`}
      className="text-slate-500"
      bordered
      icon={<IconOnramp className="h-7 w-7" />}
    />,
    <Button
      title="CEX withdrawals"
      key="CEX withdrawals"
      path={`/dashboard/${teamKey}/cex_withdrawals`}
      className="text-slate-500"
      bordered
      icon={<IconCEXwithdraw className="h-7 w-7" />}
    />,
    <Button
      title="Block explorer"
      key="Block explorer"
      path={`/dashboard/${teamKey}/block_explorer`}
      className="text-slate-500"
      bordered
      icon={<IconBlockExplorer className="h-7 w-7" />}
    />,
    <Button
      title="Marketplace"
      key="Marketplace"
      path={`/dashboard/${teamKey}/marketplace`}
      className="text-slate-500"
      icon={<IconMarketplace className="h-7 w-7" />}
    />,
  ]
}

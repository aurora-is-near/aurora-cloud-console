import Image from "next/image"
import Button from "@/components/v2/Button"

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
      icon={
        <Image
          src="/static/v2/images/menuIcons/ic_plus.svg"
          alt="Create Aurora Chain"
          width="16"
          height="16"
        />
      }
    />,
    <Button
      className="text-slate-500 hover:text-slate-900"
      title="Dashboard"
      key="Dashboard"
      path={`/dashboard/${teamKey}`}
      icon={
        <Image
          src="/static/v2/images/menuIcons/ic_dashboard.svg"
          alt="Dashboard"
          width="27"
          height="27"
        />
      }
    />,
    <Button
      className="text-slate-500 hover:text-slate-900"
      title="Monitoring"
      key="Monitoring"
      path={`/dashboard/${teamKey}/monitoring`}
      icon={
        <Image
          src="/static/v2/images/menuIcons/ic_monitoring.svg"
          alt="Monitoring"
          width="27"
          height="27"
        />
      }
    />,
    <Button
      className="text-slate-500 hover:text-slate-900"
      title="Configuration"
      key="Configuration"
      path={`/dashboard/${teamKey}/configuration`}
      icon={
        <Image
          src="/static/v2/images/menuIcons/ic_config.svg"
          alt="Configuration"
          width="27"
          height="27"
        />
      }
    />,
    <Button
      className="text-slate-500 hover:text-slate-900"
      title="Gas Abstraction"
      key="Gas Abstraction"
      path={`/dashboard/${teamKey}/gas_abstraction`}
      icon={
        <Image
          src="/static/v2/images/menuIcons/ic_gas.svg"
          alt="Gas Abstraction"
          width="27"
          height="27"
        />
      }
    />,
  ]
}

export const stackMenuButtons = [
  <Button
    title="Bridge"
    key="Bridge"
    path="/dashboard/bridge"
    className="text-slate-500 hover:text-slate-900"
    bordered
    icon={
      <Image
        src="/static/v2/images/menuIcons/ic_bridge.svg"
        alt="Bridge"
        width="27"
        height="27"
      />
    }
  />,
  <Button
    title="Oracle"
    key="Oracle"
    path="/dashboard/oracle"
    className="text-slate-500 hover:text-slate-900"
    bordered
    icon={
      <Image
        src="/static/v2/images/menuIcons/ic_oracle.svg"
        alt="Oracle"
        width="27"
        height="27"
      />
    }
  />,
  <Button
    title="Onramp"
    key="Onramp"
    path="/dashboard/onramp"
    className="text-slate-500 hover:text-slate-900"
    bordered
    icon={
      <Image
        src="/static/v2/images/menuIcons/ic_onramp.svg"
        alt="Onramp"
        width="27"
        height="27"
      />
    }
  />,
  <Button
    title="CEX withdrawals"
    key="CEX withdrawals"
    path="/dashboard/create"
    className="text-slate-500 hover:text-slate-900"
    bordered
    icon={
      <Image
        src="/static/v2/images/menuIcons/ic_cexwithdraw.svg"
        alt="CEX withdrawals"
        width="27"
        height="27"
      />
    }
  />,
  <Button
    title="Block explorer"
    key="Block explorer"
    className="text-slate-500 hover:text-slate-900"
    bordered
    icon={
      <Image
        src="/static/v2/images/menuIcons/ic_blockexplorer.svg"
        alt="Block explorer"
        width="27"
        height="27"
      />
    }
  />,
  <Button
    title="Marketplace"
    key="Marketplace"
    className="text-slate-500 hover:text-slate-900"
    icon={
      <Image
        src="/static/v2/images/menuIcons/ic_marketplace.svg"
        alt="Marketplace"
        width="27"
        height="27"
      />
    }
  />,
]

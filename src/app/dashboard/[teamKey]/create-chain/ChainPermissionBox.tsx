import { ComponentType } from "react"
import clsx from "clsx"
import SelectableBox from "@/components/onboarding/SelectableBox"
import { ChainPermission } from "@/types/chain-creation"
import {
  ChainPrivate,
  ChainPublic,
  ChainPublicPermissioned,
} from "../../../../../public/static/v2/images/icons"

interface ChainPermissionBoxProps {
  permission: ChainPermission
  onClick: () => void
  selected: boolean
  disabled?: boolean
  isDevnet?: boolean
}

const ChainPermissionBox: React.FC<ChainPermissionBoxProps> = ({
  permission,
  onClick,
  selected,
  disabled = false,
  isDevnet = false,
}) => {
  const TITLES: Record<ChainPermission, string> = {
    public: "Public",
    public_permissioned: "Public Permissioned",
    private: "Private",
  }

  const DESCRIPTIONS: Record<ChainPermission, string> = {
    public: "Anyone can freely interact and deploy contracts on your chain.",
    public_permissioned: isDevnet
      ? "On devnet, permissions are set to public permissioned by default."
      : "You decide who can interact and deploy contracts on your chain.",
    private: "A permissionned chain with fully private data.",
  }

  const ICONS: Record<
    ChainPermission,
    ComponentType<React.SVGProps<SVGSVGElement>>
  > = {
    public: ChainPublic,
    public_permissioned: ChainPublicPermissioned,
    private: ChainPrivate,
  }

  const Icon = ICONS[permission]

  return (
    <SelectableBox
      selected={selected}
      onClick={onClick}
      className="w-full p-6"
      disabled={disabled}
    >
      <div className="flex items-center mb-2">
        <div
          className={clsx(
            "bg-gray-100 p-1 rounded-full mr-2",
            selected ? "text-slate-50 bg-slate-900" : "text-slate-900",
          )}
        >
          {Icon && <Icon />}
        </div>
        <h3 className="font-bold text-slate-900 text-xl tracking-tight leading-6">
          {TITLES[permission]}
        </h3>
      </div>
      <p className="text-sm text-slate-700">{DESCRIPTIONS[permission]}</p>
    </SelectableBox>
  )
}

export default ChainPermissionBox

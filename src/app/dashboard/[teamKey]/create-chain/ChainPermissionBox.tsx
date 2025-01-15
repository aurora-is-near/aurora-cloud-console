import { ComponentType } from "react"

import { Typography, clsx } from "@/uikit"
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
      className="w-full p-6 gap-2"
      disabled={disabled}
    >
      <div className="flex items-center">
        <div
          className={clsx(
            "w-6 h-6 p-1 rounded-full mr-2 flex items-center justify-center",
            selected ? "text-slate-50 bg-slate-900" : "bg-slate-200",
            disabled ? "bg-slate-200 text-slate-500" : "bg-gray-100",
          )}
        >
          {Icon && <Icon />}
        </div>
        <Typography
          variant="heading"
          size={3}
          className={disabled ? "text-slate-500" : "text-slate-900"}
        >
          {TITLES[permission]}
        </Typography>
      </div>
      <p className="text-sm text-slate-700">{DESCRIPTIONS[permission]}</p>
      {disabled ? (
        <div className="flex items-center justify-center py-[5px] px-2 rounded-full bg-slate-400">
          <span className="text-xxs text-white">COMING SOON</span>
        </div>
      ) : null}
    </SelectableBox>
  )
}

export default ChainPermissionBox

import React, { ComponentType } from "react"
import SelectableBox from "./SelectableBox"
import { ChainPermission } from "./useChainCreationForm"
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
  const getTitle = (perm: ChainPermission) => {
    switch (perm) {
      case "public":
        return "Public"
      case "public_permissioned":
        return "Public Permissioned"
      case "private":
        return "Private "
      default:
        return "Unknown"
    }
  }

  const getDescription = (perm: ChainPermission) => {
    switch (perm) {
      case "public":
        return "Anyone can freely interact and deploy contracts on your chain."
      case "public_permissioned":
        return isDevnet
          ? "On devnet, permissions are set to public permissioned by default."
          : "You decide who can interact and deploy contracts on your chain."
      case "private":
        return "A permissionned chain with fully private data."
      default:
        return "Description not available"
    }
  }

  const getIcon = (perm: ChainPermission) => {
    switch (perm) {
      case "public":
        return ChainPublic as ComponentType<React.SVGProps<SVGSVGElement>>
      case "public_permissioned":
        return ChainPublicPermissioned as ComponentType<
          React.SVGProps<SVGSVGElement>
        >
      case "private":
        return ChainPrivate as ComponentType<React.SVGProps<SVGSVGElement>>
      default:
        return null
    }
  }

  const Icon = getIcon(permission)

  return (
    <SelectableBox
      selected={selected}
      onClick={onClick}
      className="w-full p-6"
      disabled={disabled}
    >
      <div className="flex items-center mb-4">
        <div
          className={`bg-gray-100 p-2 rounded-full mr-4 ${
            selected ? "text-slate-900" : "text-slate-500"
          }`}
        >
          {Icon && <Icon />}
        </div>
        <h3 className="font-semibold text-lg">{getTitle(permission)}</h3>
      </div>
      <p className="text-sm">{getDescription(permission)}</p>
    </SelectableBox>
  )
}

export default ChainPermissionBox

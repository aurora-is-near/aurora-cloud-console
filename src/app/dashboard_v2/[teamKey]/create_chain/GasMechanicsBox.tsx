import React, { ComponentType } from "react"
import { FireIcon, SparklesIcon, StarIcon } from "@heroicons/react/20/solid"
import SelectableBox from "../../../../components/v2/dashboard/SelectableBox"
import { GasMechanics } from "./useChainCreationForm"

interface GasMechanicsBoxProps {
  mechanic: GasMechanics
  onClick: () => void
  selected: boolean
  disabled?: boolean
}

const GasMechanicsBox: React.FC<GasMechanicsBoxProps> = ({
  mechanic,
  onClick,
  selected,
  disabled = false,
}) => {
  const getTitle = (mech: GasMechanics) => {
    switch (mech) {
      case "usage":
        return "Usage based"
      case "free":
        return "Free"
      case "custom":
        return "Custom"
      default:
        return "Unknown"
    }
  }

  const getDescription = (mech: GasMechanics) => {
    switch (mech) {
      case "usage":
        return "Gas fees are calculated based on the transaction size and charged to the end user."
      case "free":
        return "All gas fees are abstracted for end users. The chain owner is responsible for covering these costs."
      case "custom":
        return "You can select who gets free transactions and under what conditions."
      default:
        return "Description not available"
    }
  }

  const getIcon = (mech: GasMechanics) => {
    switch (mech) {
      case "usage":
        return FireIcon as ComponentType<React.SVGProps<SVGSVGElement>>
      case "custom":
        return SparklesIcon as ComponentType<React.SVGProps<SVGSVGElement>>
      case "free":
        return StarIcon as ComponentType<React.SVGProps<SVGSVGElement>>
      default:
        return null
    }
  }

  const Icon = getIcon(mechanic)

  return (
    <SelectableBox
      selected={selected}
      onClick={onClick}
      className="w-full p-6"
      disabled={disabled}
    >
      <div className="flex items-center mb-2">
        <div
          className={`bg-gray-100 p-1 rounded-full mr-2 ${
            selected ? "text-slate-50 bg-slate-900" : "text-slate-900"
          }`}
        >
          {Icon && <Icon className="w-4 h-4" />}
        </div>
        <h3 className="font-semibold text-lg">{getTitle(mechanic)}</h3>
      </div>
      <p className="text-sm text-slate-700">{getDescription(mechanic)}</p>
    </SelectableBox>
  )
}

export default GasMechanicsBox

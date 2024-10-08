import { FireIcon, SparklesIcon, StarIcon } from "@heroicons/react/20/solid"
import SelectableBox from "@/components/onboarding/SelectableBox"
import { GasMechanics } from "@/types/chain-creation"

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
  const TITLES: Record<GasMechanics, string> = {
    usage: "Usage based",
    free: "Free",
    custom: "Custom",
  }

  const DESCRIPTIONS: Record<GasMechanics, string> = {
    usage:
      "Gas fees are calculated based on the transaction size and charged to the end user.",
    free: "All gas fees are abstracted for end users. The chain owner is responsible for covering these costs.",
    custom:
      "You can select who gets free transactions and under what conditions.",
  }

  const ICONS: Record<
    GasMechanics,
    React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string
        titleId?: string
      } & React.RefAttributes<SVGSVGElement>
    >
  > = {
    usage: FireIcon,
    custom: SparklesIcon,
    free: StarIcon,
  }

  const Icon = ICONS[mechanic]

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
        <h3 className="font-semibold text-lg">{TITLES[mechanic]}</h3>
      </div>
      <p className="text-sm text-slate-700">{DESCRIPTIONS[mechanic]}</p>
    </SelectableBox>
  )
}

export default GasMechanicsBox

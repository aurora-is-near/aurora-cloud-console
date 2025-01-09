import { FireIcon, SparklesIcon, StarIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
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
          {Icon && <Icon className="w-4 h-4" />}
        </div>
        <h3
          className={clsx(
            "font-bold text-xl tracking-tight leading-6",
            disabled ? "text-slate-500" : "text-slate-900",
          )}
        >
          {TITLES[mechanic]}
        </h3>
      </div>
      <p className="text-sm text-slate-700">{DESCRIPTIONS[mechanic]}</p>
      {disabled ? (
        <div className="flex items-center justify-center py-[5px] px-2 rounded-full bg-slate-400">
          <span className="text-xxs text-white">COMING SOON</span>
        </div>
      ) : null}
    </SelectableBox>
  )
}

export default GasMechanicsBox

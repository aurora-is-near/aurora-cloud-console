import clsx from "clsx"
import SelectableBox from "@/components/onboarding/SelectableBox"
import { NetworkType } from "@/types/chain-creation"
import { WarningOctagon } from "../../../../../public/static/v2/images/icons"

interface ChainTypeBoxProps {
  title: string
  description: string
  type: NetworkType
  onClick: () => void
  selected: boolean
  disabled?: boolean
}

const Label: React.FC<{ type: "free" | "enterprise" }> = ({ type }) => {
  const bgColor = type === "free" ? "bg-green-600" : "bg-slate-400"
  const textColor = type === "free" ? "text-green-50" : "text-green-50"
  const text = type === "free" ? "Coming Soon" : "Enterprise"

  return (
    <div
      className={clsx(
        "p-0.5 px-1.5 uppercase rounded-2xl text-xs font-medium",
        bgColor,
        textColor,
      )}
    >
      {text}
    </div>
  )
}

const ChainTypeBox: React.FC<ChainTypeBoxProps> = ({
  title,
  description,
  type,
  onClick,
  selected,
  disabled,
}) => {
  return (
    <SelectableBox
      selected={selected}
      onClick={onClick}
      className="p-6"
      disabled={disabled}
    >
      <div className="flex flex-row justify-between items-start w-full">
        <h3 className="font-semibold mb-2 text-slate-900 text-xl tracking-tight">
          {title}
        </h3>
        <Label type={type === "devnet" ? "free" : "enterprise"} />
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      {type === "devnet" && (
        <div className="flex flex-row items-start mt-2">
          <WarningOctagon className="w-5 h-4 mr-[5px]" />
          <p className="text-xs text-slate-500">
            Devnet is limited in functionalities and native assets cannot be
            bridged out.
          </p>
        </div>
      )}
    </SelectableBox>
  )
}

export default ChainTypeBox

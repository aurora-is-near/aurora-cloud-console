import React from "react"
import SelectableBox from "./SelectableBox"

interface ChainTypeBoxProps {
  title: string
  description: string
  type: "free" | "enterprise"
  onClick: () => void
  selected: boolean
}

const Label: React.FC<{ type: "free" | "enterprise" }> = ({ type }) => {
  const bgColor = type === "free" ? "bg-green-600" : "bg-slate-400"
  const textColor = type === "free" ? "text-green-50" : "text-green-50"
  const text = type === "free" ? "Free" : "Enterprise"

  return (
    <div
      className={`p-0.5 px-1.5 uppercase rounded-2xl text-xs font-medium ${bgColor} ${textColor}`}
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
}) => {
  return (
    <SelectableBox
      selected={selected}
      onClick={onClick}
      className="w-[50%] p-6"
    >
      <div className="flex flex-row justify-between items-start">
        <h3 className="font-semibold text-lg mb-2 text-slate-900">{title}</h3>
        <Label type={type} />
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </SelectableBox>
  )
}

export default ChainTypeBox

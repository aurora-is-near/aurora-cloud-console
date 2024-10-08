import { InformationCircleIcon } from "@heroicons/react/20/solid"

type InfoTooltipProps = {
  text: string
}

export const InfoTooltip = ({ text }: InfoTooltipProps) => (
  <div className="h-5 w-5 relative flex items-center justify-center group cursor-pointer">
    <InformationCircleIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors duration-200" />
    <div className="cursor-auto pt-1 hidden group-hover:block absolute top-full left-1">
      <div className="relative z-10 bg-slate-700 shadow-lg rounded-lg text-sm py-2 px-3 break-words w-52 text-white">
        {text}
      </div>
    </div>
  </div>
)

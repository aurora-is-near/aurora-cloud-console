import { ReactNode } from "react"
import { InformationCircleIcon } from "@heroicons/react/20/solid"
import CopyButton from "./CopyButton"
import clsx from "clsx"

const Tooltip = ({ text }: { text: string }) => (
  <div className="h-5 w-5 relative flex items-center justify-center group cursor-pointer">
    <InformationCircleIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-700" />
    <div className="cursor-auto pt-1 hidden group-hover:block absolute top-full left-1">
      <div className="relative z-10 bg-gray-700 shadow-lg rounded-lg text-sm py-2 px-3 break-words w-52 text-white">
        {text}
      </div>
    </div>
  </div>
)

const Item = ({
  term,
  explainer,
  description,
  action,
  showCopyButton,
}: {
  term: string
  explainer?: string
  description?: string
  action?: ReactNode
  showCopyButton?: boolean
}) => (
  <div className="sm:grid sm:grid-cols-5 items-center">
    <div className="sm:col-span-2 flex items-center sm:py-2 gap-x-0.5">
      <dt className="text-sm font-medium leading-5 text-gray-500">{term}</dt>
      {explainer ? <Tooltip text={explainer} /> : null}
    </div>
    {description && (
      <div className="sm:col-span-3 flex flex-col items-start gap-y-1 sm:gap-y-0 sm:flex-row sm:items-center">
        <div className="flex items-center flex-1 gap-x-2.5">
          <dd className="text-sm leading-5 text-gray-900 py-2">
            {description}
          </dd>
          {showCopyButton ? <CopyButton value={description} /> : null}
        </div>
        {action}
      </div>
    )}
  </div>
)
Item.displayName = "Item"

const InfoList = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <dl
    className={clsx(
      "px-4 sm:px-5 md:px-6 pb-5 space-y-4 sm:space-y-3.5",
      className,
    )}
  >
    {children}
  </dl>
)

InfoList.Item = Item

export default InfoList

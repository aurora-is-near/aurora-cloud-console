import clsx from "clsx"
import Link from "next/link"
import { InfoTooltip } from "@/uikit"

export type InfoListProps = {
  className?: string
  items: {
    term: string
    description: React.ReactNode
    Action?: React.FC<{ term: string; description?: string }>
    tooltip?: string
  }[]
}

const TextDescription = ({ children }: { children: string }) => {
  const isLink = children.startsWith("http")
  return (
    <span className="text-sm leading-5 text-slate-900 whitespace-nowrap text-ellipsis overflow-hidden">
      {isLink ? <Link target="_blank" href={children}></Link> : children}
    </span>
  )
}

export const InfoList = ({ items, className }: InfoListProps) => {
  return (
    <dl className={clsx("divide-y divide-slate-200 flex-1", className)}>
      {items.map(({ term, tooltip, description, Action }, index) => {
        const isFirst = index === 0
        const isLast = index === items.length - 1

        return (
          <div
            key={term}
            className={clsx("grid grid-cols-5 items-center", {
              "pb-2.5": isFirst,
              "py-2 sm:py-2.5": !isFirst && !isLast,
              "pt-2.5": isLast,
            })}
          >
            <div className="col-span-2 flex items-center gap-x-1">
              <dt className="text-sm font-medium text-slate-900">{term}</dt>
              {!!tooltip && <InfoTooltip>{tooltip}</InfoTooltip>}
            </div>
            <div className="col-span-3 flex flex-row items-center justify-between gap-x-2.5">
              <dd className="w-full flex-shrink-1">
                {typeof description === "string" ? (
                  <TextDescription>{description}</TextDescription>
                ) : (
                  description
                )}
              </dd>
              {Action ? (
                <Action
                  term={term}
                  description={
                    typeof description === "string" ? description : undefined
                  }
                />
              ) : null}
            </div>
          </div>
        )
      })}
    </dl>
  )
}

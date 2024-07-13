import { cloneElement, MouseEventHandler, ReactElement, ReactNode } from "react"
import clsx from "clsx"
import { findChildren } from "@/utils/helpers"

const TH = ({
  children,
  align = "left",
  hidden = false,
  isFirst = false,
  isLast = false,
}: {
  children: React.ReactNode
  align?: "left" | "right" | "center"
  hidden?: boolean
  isFirst?: boolean
  isLast?: boolean
}) => (
  <th
    scope="col"
    className={clsx("py-3.5 text-sm leading-none font-medium text-gray-900", {
      "text-right": align === "right",
      "text-left": align === "left",
      "text-center": align === "center",
      "pl-4 pr-3 sm:pl-6": isFirst,
      "pl-3 pr-4 sm:pr-6": isLast,
      "px-3": !isFirst && !isLast,
      relative: hidden,
    })}
  >
    {hidden ? <span className="sr-only">{children}</span> : children}
  </th>
)

TH.displayName = "TH"

const TD = ({
  children,
  dark = false,
  align = "left",
  onClick,
  isFirst = false,
  isLast = false,
  isLink = false,
}: {
  children: React.ReactNode
  dark?: boolean
  align?: "left" | "right" | "center"
  onClick?: () => void
  isFirst?: boolean
  isLast?: boolean
  isLink?: boolean
}) => (
  <td
    onClick={onClick}
    className={clsx(
      "whitespace-nowrap px-3 py-4 text-sm leading-none",
      dark ? "font-medium text-gray-900" : "text-gray-500",
      isLink && "group-hover:underline",
      {
        "pl-4 pr-3 sm:pl-6": isFirst,
        "pl-3 pr-4 sm:pr-6": isLast,
        "px-3": !isFirst && !isLast,
      },
    )}
  >
    <div
      className={clsx("flex items-center gap-x-2.5", {
        "justify-end": align === "right",
        "justify-start": align === "left",
        "justify-center": align === "center",
      })}
    >
      {children}
    </div>
  </td>
)

TD.displayName = "TD"

const TR = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLTableRowElement>
}) => {
  const tds = findChildren(children, "TD")

  return (
    <tr
      onClick={onClick}
      className={clsx("group", onClick && "cursor-pointer")}
    >
      {tds?.map((td, i) => {
        const isFirst = i === 0
        const isLast = i === tds.length - 1

        return cloneElement(td as ReactElement, {
          isFirst,
          isLast,
        })
      })}
    </tr>
  )
}

TR.displayName = "TR"

const Table = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const ths = findChildren(children, "TH")
  const trs = findChildren(children, "TR")

  return (
    <div className={clsx("flow-root", className)}>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-white">
                <tr>
                  {ths?.map((th, i) => {
                    const isFirst = i === 0
                    const isLast = i === ths.length - 1

                    return cloneElement(th as ReactElement, {
                      isFirst,
                      isLast,
                    })
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">{trs}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

Table.TH = TH
Table.TR = TR
Table.TD = TD

export default Table

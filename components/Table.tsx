import { ReactElement, ReactNode, cloneElement } from "react"
import { findChildren } from "@/utils/helpers"
import clsx from "clsx"

const TH = ({
  children,
  align = "left",
  hidden = false,
  isFirst = false,
  isLast = false,
}: {
  children: React.ReactNode
  align?: "left" | "right"
  hidden?: boolean
  isFirst?: boolean
  isLast?: boolean
}) => (
  <th
    scope="col"
    className={clsx("py-3.5 text-sm leading-none font-medium text-gray-900", {
      "text-right": align === "right",
      "text-left": align === "left",
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
  isFirst = false,
  isLast = false,
}: {
  children: React.ReactNode
  dark?: boolean
  align?: "left" | "right"
  isFirst?: boolean
  isLast?: boolean
}) => (
  <td
    className={clsx(
      "whitespace-nowrap px-3 py-4 text-sm leading-none",
      dark ? "font-medium text-gray-900" : "text-gray-500",
      {
        "text-right": align === "right",
        "text-left": align === "left",
        "pl-4 pr-3 sm:pl-6": isFirst,
        "pl-3 pr-4 sm:pr-6": isLast,
        "px-3": !isFirst && !isLast,
      },
    )}
  >
    <div
      className={clsx("flex items-center gap-x-2.5", {
        "justify-end": align === "right",
      })}
    >
      {children}
    </div>
  </td>
)
TD.displayName = "TD"

const TR = ({ children }: { children: React.ReactNode }) => {
  const tds = findChildren(children, "TD")

  return (
    <tr>
      {tds?.map((td, i) => {
        const isFirst = i === 0
        const isLast = i === tds.length - 1

        return cloneElement(td as ReactElement<any>, {
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
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-white">
                <tr>
                  {ths?.map((th, i) => {
                    const isFirst = i === 0
                    const isLast = i === ths.length - 1

                    return cloneElement(th as ReactElement<any>, {
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

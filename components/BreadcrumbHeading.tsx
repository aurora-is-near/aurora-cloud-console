import { ChevronRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Fragment } from "react"
import Heading from "./Heading"

const BreadcrumbHeading = ({ titles }: { titles: [string, string] }) => {
  return (
    <div className="flex gap-x-1.5 items-center">
      {titles.map((title, index) => {
        const isFirst = index === 0

        return (
          <Fragment key={title}>
            <Heading
              tag={isFirst ? "h2" : "h3"}
              textColorClassName={clsx({ "text-gray-500": isFirst })}
            >
              {title}
            </Heading>
            {isFirst ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            ) : null}
          </Fragment>
        )
      })}
    </div>
  )
}

export default BreadcrumbHeading

import { ChevronRightIcon } from "@heroicons/react/24/outline"
import Heading from "./Heading"
import clsx from "clsx"
import { Fragment } from "react"

type BreadcrumbHeadingProps = {
  titles: [string, string]
  isLoading?: boolean
}

const BreadcrumbHeading = ({ titles, isLoading }: BreadcrumbHeadingProps) => {
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
              {isLoading ? <>&nbsp;</> : title}
            </Heading>
            {isFirst && !isLoading ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            ) : null}
          </Fragment>
        )
      })}
    </div>
  )
}

export default BreadcrumbHeading

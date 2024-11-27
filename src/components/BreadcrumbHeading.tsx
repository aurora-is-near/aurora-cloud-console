import { ChevronRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Fragment } from "react"
import Heading from "./Heading"

type BreadcrumbHeadingProps = {
  titles: string[]
  isLoading?: boolean
}

const BreadcrumbHeading = ({ titles, isLoading }: BreadcrumbHeadingProps) => {
  return (
    <div className="flex gap-x-1.5 items-center">
      {titles.map((title, index) => {
        const isLast = index === titles.length - 1

        return (
          <Fragment key={title}>
            <Heading
              tag={isLast ? "h2" : "span"}
              textColorClassName={clsx({ "text-gray-500": !isLast })}
            >
              {isLoading ? <>&nbsp;</> : title}
            </Heading>
            {!isLast && !isLoading && (
              <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

export default BreadcrumbHeading

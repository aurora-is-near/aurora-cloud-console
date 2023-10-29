import { ReactNode } from "react"
import clsx from "clsx"

type HeadingTags = "h1" | "h2" | "h3" | "span"

const Heading = ({
  children,
  className,
  textColorClassName = "text-gray-900",
  tag = "h1",
}: {
  children: ReactNode
  className?: string
  textColorClassName?: string
  tag?: HeadingTags
}) => {
  const Tag = tag

  return (
    <Tag
      className={clsx(
        "text-xl sm:text-2xl leading-7 font-bold tracking-[-1px]",
        textColorClassName,
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default Heading

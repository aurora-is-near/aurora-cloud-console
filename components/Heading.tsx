import { ReactNode } from "react"
import clsx from "clsx"

type HeadingTags = "h1" | "h2" | "h3"

const Heading = ({
  children,
  className,
  tag = "h1",
}: {
  children: ReactNode
  className?: string
  tag?: HeadingTags
}) => {
  const Tag = tag

  return (
    <Tag
      className={clsx(
        "text-2xl leading-7 font-bold text-gray-900 tracking-[-1px]",
        className
      )}
    >
      {children}
    </Tag>
  )
}

export default Heading

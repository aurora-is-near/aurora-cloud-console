import { ReactNode } from "react"
import clsx from "clsx"

type HeadingTags = "h1" | "h2" | "h3" | "span"

const Heading = ({
  children,
  className,
  textColorClassName = "text-slate-900",
  tag = "h1",
  size = "md",
}: {
  children: ReactNode
  className?: string
  textColorClassName?: string
  tag?: HeadingTags
  size?: "sm" | "md" | "lg"
}) => {
  const Tag = tag

  return (
    <Tag
      className={clsx(
        "text-xl leading-7 font-bold tracking-tight",
        size === "md" && "sm:text-2xl",
        size === "lg" && "md:text-4xl",
        textColorClassName,
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default Heading

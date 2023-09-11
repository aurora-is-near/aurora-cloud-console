import { ReactNode } from "react"
import clsx from "clsx"

const Card = ({
  className,
  tag = "div",
  children,
  ...rest
}: {
  className?: string
  tag?: keyof JSX.IntrinsicElements
  children: ReactNode
  [key: string]: unknown
}) => {
  const Tag = tag

  return (
    <Tag
      className={clsx("overflow-hidden rounded-md bg-white shadow", className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Card

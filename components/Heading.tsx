import { ReactNode } from "react"

type HeadingTags = "h1" | "h2"

const Heading = ({
  children,
  tag = "h1",
}: {
  children: ReactNode
  tag?: HeadingTags
}) => {
  const Tag = tag

  return (
    <Tag className="text-2xl leading-7 font-bold text-gray-900 tracking-[-1px]">
      {children}
    </Tag>
  )
}

export default Heading

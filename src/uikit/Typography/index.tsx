/* eslint-disable react/destructuring-assignment */

import { Label, type LabelProps } from "./Label"
import { Heading, type HeadingProps } from "./Heading"
import { Paragraph, type ParagraphProps } from "./Paragraph"

import { notReachable } from "../../utils/notReachable"

type Props =
  | ({ variant: "label" } & LabelProps)
  | ({ variant: "heading" } & HeadingProps)
  | ({ variant: "paragraph" } & ParagraphProps)

export const Typography = (props: Props) => {
  switch (props.variant) {
    case "label":
      return <Label {...props} />
    case "heading":
      return <Heading {...props} />
    case "paragraph":
      return <Paragraph {...props} />
    default:
      return notReachable(props)
  }
}

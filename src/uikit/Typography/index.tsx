import { Label, type LabelProps } from "./Label"
import { Heading, type HeadingProps } from "./Heading"
import { Paragraph, type ParagraphProps } from "./Paragraph"

import { notReachable } from "../../utils/notReachable"

type Props =
  | ({ variant: "label" } & LabelProps)
  | ({ variant: "heading" } & HeadingProps)
  | ({ variant: "paragraph" } & ParagraphProps)

export const Typography = (props: Props) => {
  /* eslint-disable-next-line react/destructuring-assignment */
  switch (props.variant) {
    case "label": {
      const { variant, ...rest } = props
      return <Label {...rest} />
    }
    case "heading": {
      const { variant, ...rest } = props
      return <Heading {...rest} />
    }
    case "paragraph": {
      const { variant, ...rest } = props
      return <Paragraph {...rest} />
    }
    default:
      return notReachable(props)
  }
}

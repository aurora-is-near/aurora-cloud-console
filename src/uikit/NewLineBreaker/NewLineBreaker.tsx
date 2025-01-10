import { Fragment } from "react"

type Props = {
  children: string
}

export const NewLineBreaker = ({ children }: Props) => {
  const textPieces = children.split("\\n")

  if (textPieces.length === 1) {
    return children
  }

  return (
    <>
      {textPieces.map((text) => (
        <Fragment key={text}>
          {text}
          <br />
        </Fragment>
      ))}
    </>
  )
}

type Props = {
  children: string
}

export const LineBreak = ({ children }: Props) => {
  const textPieces = children.split("\\n")

  if (textPieces.length === 1) {
    return <>{children}</>
  }

  return (
    <>
      {textPieces.map((text) => (
        <>
          {text}
          <br />
        </>
      ))}
    </>
  )
}

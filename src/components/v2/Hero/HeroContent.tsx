import React from "react"

const HeroContent: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...props
}) => {
  return (
    <p className="text-md text-slate-500 tracking-tight font-medium" {...props}>
      {children}
    </p>
  )
}

export default HeroContent

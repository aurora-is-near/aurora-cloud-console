const HeroContent: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...props
}) => {
  return (
    <p
      className="text-lg leading-relaxed text-slate-500 tracking-tight font-medium"
      {...props}
    >
      {children}
    </p>
  )
}

export default HeroContent

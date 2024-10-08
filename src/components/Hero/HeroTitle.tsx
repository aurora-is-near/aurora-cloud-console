const HeroTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return (
    <h1
      className="text-3xl font-bold text-slate-900 tracking-tighter"
      {...props}
    >
      {children}
    </h1>
  )
}

export default HeroTitle

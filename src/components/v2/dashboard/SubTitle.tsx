interface SubTitleProps {
  children: React.ReactNode
  className?: string
}

const SubTitle = ({ children, className }: SubTitleProps) => {
  return (
    <h3
      className={`text-2xl text-slate-900 tracking-tighter font-semibold ${className}`}
    >
      {children}
    </h3>
  )
}

export default SubTitle

import clsx from "clsx"

interface SubTitleProps {
  children: React.ReactNode
  className?: string
}

const SubTitle = ({ children, className }: SubTitleProps) => {
  return (
    <h2
      className={clsx(
        "text-2xl text-slate-900 tracking-tighter font-semibold",
        className,
      )}
    >
      {children}
    </h2>
  )
}

export default SubTitle

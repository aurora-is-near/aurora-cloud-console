const Pill = ({ label }: { label: string }) => {
  return (
    <span className="text-xs rounded-sm px-2 py-0.5 font-bold text-slate-900 bg-slate-100 self-start">
      {label}
    </span>
  )
}

export default Pill

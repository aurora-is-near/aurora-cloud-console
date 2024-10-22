const Pill = ({ label }: { label: string }) => {
  return (
    <span className="text-xs rounded-md px-2 py-0.5 font-medium text-slate-900 bg-slate-200 self-start">
      {label}
    </span>
  )
}

export default Pill

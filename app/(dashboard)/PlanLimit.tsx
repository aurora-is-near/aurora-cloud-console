const planLimit = {
  current: 56000,
  max: 100000,
}

const formatter = new Intl.NumberFormat("en-US", { notation: "compact" })
const planUsedPercentage = (planLimit.current / planLimit.max) * 100

const PlanLimit = () => {
  return (
    <div>
      <p className="text-xs leading-3 font-medium text-gray-500">Plan limit</p>
      <div className="mt-2.5 w-full h-1 bg-gray-200 rounded-full">
        <div
          className="h-full bg-gray-900 rounded-full"
          style={{
            width: `${planUsedPercentage}%`,
          }}
        />
      </div>
      <div className="mt-2 flex justify-between">
        <span className="text-sm leading-none font-medium text-gray-900">
          {formatter.format(planLimit.current)}
        </span>
        <span className="text-sm leading-none font-medium text-gray-500">
          {formatter.format(planLimit.max)}
        </span>
      </div>
    </div>
  )
}

export default PlanLimit

import clsx from "clsx"

const Chart = ({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) => {
  return (
    <div className={clsx("border bg-white rounded-md", className)}>
      <div className="px-6 pt-5 pb-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base leading-none font-medium text-gray-900">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-gray-500 text-xs leading-none font-medium">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="w-full bg-gray-200 h-44 rounded-md" />
      </div>
      <div className="px-1 pb-1">
        <div className="bg-gray-50 w-full h-9 rounded-b-sm flex space-x-6 items-center px-5">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-green-400" />
            <span className="text-xs text-gray-900 leading-3 font-medium">
              10%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-cyan-400" />
            <span className="text-xs text-gray-900 leading-3 font-medium">
              25%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-orange-400" />
            <span className="text-xs text-gray-900 leading-3 font-medium">
              50%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-purple-400" />
            <span className="text-xs text-gray-900 leading-3 font-medium">
              100%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart

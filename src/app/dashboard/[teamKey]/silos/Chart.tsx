import Card from "@/components/Card"
import clsx from "clsx"

const Chart = ({
  title,
  subtitle,
  className,
  legend,
}: {
  title: string
  subtitle?: string
  className?: string
  legend?: string[]
}) => {
  return (
    <Card className={className}>
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
      {legend && legend.length > 0 ? (
        <div className="px-1 pb-1">
          <div className="bg-gray-50 w-full h-9 rounded-b-sm flex space-x-6 items-center px-5">
            {legend.map((text, i) => (
              <div key={text} className="flex items-center space-x-2">
                <div
                  className={clsx("h-2.5 w-2.5 rounded-sm", {
                    "bg-green-400": i === 0,
                    "bg-cyan-400": i === 1,
                    "bg-orange-400": i === 2,
                    "bg-purple-400": i === 3,
                  })}
                />
                <span className="text-xs text-gray-900 leading-3 font-medium">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Card>
  )
}

export default Chart

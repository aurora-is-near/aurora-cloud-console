import { ReactNode } from "react"
import Link from "next/link"

type RuleSettingProps = {
  title: string
  description: string
  descriptionUrl?: string
  children?: ReactNode
}

export const RuleSetting = ({
  children,
  title,
  description,
  descriptionUrl,
}: RuleSettingProps) => (
  <div className="border border-slate-200 rounded-md p-3 flex flex-row flex-1 justify-between gap-x-2">
    <div className="text-sm">
      <h3 className="font-medium text-slate-900">{title}</h3>
      <p className="text-slate-500">
        {descriptionUrl ? (
          <Link href={descriptionUrl} className="text-cyan-600 hover:underline">
            {description}
          </Link>
        ) : (
          description
        )}
      </p>
    </div>
    {children}
  </div>
)

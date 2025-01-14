import { CheckIcon } from "@heroicons/react/24/outline"

import { clsx, Typography } from "@/uikit"
import { LinkButton } from "@/components/LinkButton"

type Props = {
  index: number
  state: "active" | "completed" | "upcoming"
  title: string
  description: string
  link: { label: string } & (
    | { isDisabled: true; url?: string | null }
    | { isDisabled: false; url: string }
  )
}

export const StepCard = ({ index, state, title, description, link }: Props) => (
  <div
    className={clsx(
      "flex flex-wrap sm:flex-nowrap justify-between items-center gap-6 w-full px-6 py-8 border border-slate-200 bg-slate-100 rounded-lg",
      {
        "border-green-300 bg-green-50 shadow-sm": state === "active",
      },
    )}
  >
    <div
      className={clsx(
        "grow-0 shrink-0 flex items-center justify-center w-10 h-10 text-white bg-slate-400 rounded-full",
        {
          "bg-slate-900": state !== "upcoming",
        },
      )}
    >
      {state === "completed" ? (
        <CheckIcon className="w-5 h-5 text-green-400" />
      ) : (
        index
      )}
    </div>
    <div className="mr-auto">
      <Typography variant="heading" size={4}>
        {title}
      </Typography>
      <Typography variant="paragraph" size={4} className="text-gray-500">
        {description}
      </Typography>
    </div>
    {state === "active" && (
      <LinkButton
        size="lg"
        disabled={link.isDisabled}
        href={link.isDisabled ? link.url ?? "" : link.url}
      >
        {link.label}
      </LinkButton>
    )}
  </div>
)

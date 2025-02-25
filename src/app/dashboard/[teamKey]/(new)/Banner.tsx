import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import type { ComponentProps } from "react"

import { clsx, Typography } from "@/uikit"
import { LinkButton } from "@/components/LinkButton"

type PassedLinkProps = Omit<
  ComponentProps<typeof LinkButton>,
  "size" | "variant" | "href"
>

type Props = {
  variant: "info" | "cta"
  title: string
  Icon: JSX.Element
  description: string | JSX.Element
  link?: PassedLinkProps & { label: string } & (
      | { isDisabled: true; url?: string | null }
      | { isDisabled?: false; url: string }
    )
}

export const Banner = ({ variant, Icon, title, description, link }: Props) => (
  <div
    className={clsx(
      "flex flex-wrap sm:flex-nowrap justify-between gap-6 w-full px-6 py-8 border rounded-lg shadow-sm",
      {
        "border-green-300 bg-green-50": variant === "cta",
        "border-slate-200 bg-white": variant === "info",
      },
    )}
  >
    <div className="grow-0 shrink-0 flex">{Icon}</div>
    <div className="flex flex-col gap-1 mr-auto max-w-[684px]">
      <Typography variant="heading" size={3}>
        {title}
      </Typography>
      <Typography variant="paragraph" size={4} className="text-gray-500">
        {description}
      </Typography>
    </div>
    {link && (
      <LinkButton
        size="md"
        variant={variant === "cta" ? "primary" : "border"}
        href={link.isDisabled ? (link.url ?? "") : link.url}
        {...link}
      >
        {link.label}
        {link.isExternal && <ArrowTopRightOnSquareIcon className="w-5 h-5" />}
      </LinkButton>
    )}
  </div>
)

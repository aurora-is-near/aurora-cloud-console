import clsx from "clsx"
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/20/solid"
import { LinkButton } from "@/components/LinkButton"
import { Heading } from "@/uikit/Typography/Heading"

type MarketplaceCollectionCardProps = {
  variant: "green" | "orange"
  seeAllLink: string
  title: string
  iconSrc: string
}

export const MarketplaceCollectionCard = ({
  variant,
  seeAllLink,
  title,
  iconSrc,
}: MarketplaceCollectionCardProps) => {
  return (
    <div
      className={clsx(
        "p-6 min-h-[232px] flex flex-col justify-between rounded-[10px] border border-black/5 shadow-sm relative overflow-hidden",
        {
          "bg-green-50": variant === "green",
          "bg-purple-50": variant === "orange",
        },
      )}
    >
      <Image src={iconSrc} width={48} height={48} alt="" />
      <div>
        <Heading size={2} as="h3">
          {title}
        </Heading>
        <LinkButton
          size="sm"
          href={seeAllLink}
          variant="border"
          className="mt-3"
        >
          See apps
          <ArrowRightIcon className="w-4 h-4" />
        </LinkButton>
      </div>
      <div
        className={clsx(
          "absolute -right-10 -top-3 w-[50%] h-[calc(100%+12px)] rounded-full opacity-50 blur-3xl",
          {
            "bg-[linear-gradient(94deg,_#22D3EE_-1.54%,_#5EEB5C_53.47%)]":
              variant === "green",
            "bg-[linear-gradient(94deg,_#C69AFF_-1.54%,_#EBB95C_53.47%)]":
              variant === "orange",
          },
        )}
      />
    </div>
  )
}

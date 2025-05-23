import clsx from "clsx"
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { getButtonClassName } from "@/utils/buttons"

type MarketplaceCollectionCardProps = {
  colorScheme: "green" | "orange"
  href: string
  title: string
  iconSrc?: string
}

export const MarketplaceCollectionCard = ({
  colorScheme,
  href,
  title,
  iconSrc,
}: MarketplaceCollectionCardProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        "p-6 sm:min-h-[232px] flex sm:flex-col sm:justify-between rounded-[10px] border border-black/5 shadow-sm relative overflow-hidden",
        "transition-shadow transition-border-color hover:transition-shadow hover:transition-border-color hover:shadow-3xl hover:border-slate-300",
        {
          "bg-green-50": colorScheme === "green",
          "bg-purple-50": colorScheme === "orange",
        },
      )}
    >
      {iconSrc ? (
        <Image src={iconSrc} width={48} height={48} alt="" />
      ) : (
        <div className="w-[48px] h-[48px]" />
      )}
      <div className="ml-6 sm:ml-0">
        <div>
          <h3 className="font-bold text-2xl sm:text-4xl tracking-tight">
            {title}
          </h3>
          <div
            className={clsx(
              "mt-3 flex items-center justify-center gap-2",
              getButtonClassName("border", "sm"),
            )}
          >
            See apps
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
        <div
          className={clsx(
            "absolute -right-10 -top-3 w-[50%] h-[calc(100%+12px)] rounded-full opacity-50 blur-3xl",
            {
              "bg-[linear-gradient(94deg,_#22D3EE_-1.54%,_#5EEB5C_53.47%)]":
                colorScheme === "green",
              "bg-[linear-gradient(94deg,_#C69AFF_-1.54%,_#EBB95C_53.47%)]":
                colorScheme === "orange",
            },
          )}
        />
      </div>
    </Link>
  )
}

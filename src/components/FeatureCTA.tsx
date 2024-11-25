import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

export interface FeatureCTAProps {
  title: string
  description: string
  icon: string
  link: string
}

const ASPECT_RATIO = 310 / 170

export const FeatureCTA = ({
  title,
  description,
  icon,
  link,
}: FeatureCTAProps) => {
  const isExternalLink = link.startsWith("http")

  return (
    <Link
      href={link}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
    >
      <div
        className={clsx(
          "rounded-xl border border-slate-200 w-full h-full bg-white",
          "transition-shadow transition-border-color hover:transition-shadow hover:transition-border-color hover:shadow-3xl hover:border-slate-300",
        )}
      >
        <div
          className="rounded-t-xl overflow-hidden relative"
          style={{ aspectRatio: ASPECT_RATIO }}
        >
          <Image src={icon} fill alt={title} />
        </div>
        <div className="p-5">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-slate-900 font-medium text-md">{title}</h3>
            <p className="text-center text-slate-500 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

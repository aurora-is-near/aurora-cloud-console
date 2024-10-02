import Image from "next/image"
import { ReactNode } from "react"
import Card from "@/components/Card"

type ServiceBannerProps = {
  name: string
  children: ReactNode
  isEnabled: boolean
  description: string[]
  imageSrc: string
}

export const ServiceBanner = ({
  name,
  children,
  isEnabled,
  description,
  imageSrc,
}: ServiceBannerProps) => {
  return (
    <Card borderRadius="xl" className="relative overflow-hidden flex flex-row">
      <div className="flex-1 xl:pr-20">
        <h1 className="flex flex-wrap gap-x-1 lg:flex-col lg:gap-x-0 text-2xl md:text-4xl	font-bold text-slate-900">
          {isEnabled ? (
            <span>{name}</span>
          ) : (
            <>
              <span>Get started</span>
              <span>with {name}</span>
            </>
          )}
        </h1>
        {description.map((text) => (
          <p
            key={text}
            className="xl:max-w-[500px] 2xl:max-w-[650px] mt-5 text-slate-600"
          >
            {text}
          </p>
        ))}
        <div className="inline-block mt-6">{children}</div>
      </div>
      <div className="hidden xl:block absolute top-[50%] -translate-y-1/2 right-12">
        <Image
          src={imageSrc}
          alt=""
          width={280}
          height={320}
          className="flex-shrink-0"
        />
      </div>
    </Card>
  )
}

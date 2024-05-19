import Card from "@/components/Card"
import Image from "next/image"

type ServiceBannerProps = {
  name: string
  enableButton: JSX.Element
  isEnabled: boolean
  description: string[]
  imageSrc: string
}

export const ServiceBanner = ({
  name,
  enableButton,
  isEnabled,
  description,
  imageSrc,
}: ServiceBannerProps) => {
  return (
    <Card borderRadius="xl" className="relative overflow-hidden flex flex-row">
      <div className="flex-1 xl:pr-20">
        <h1 className="flex flex-wrap gap-x-1 lg:flex-col lg:gap-x-0 text-2xl md:text-4xl	font-bold text-gray-900">
          {isEnabled ? (
            <span>{name}</span>
          ) : (
            <>
              <span>Get started</span>
              <span>with {name}</span>
            </>
          )}
        </h1>
        {description.map((text, index) => (
          <p
            key={index}
            className="xl:max-w-[500px] 2xl:max-w-[650px] mt-5 text-gray-600"
          >
            {text}
          </p>
        ))}
        <div className="inline-block mt-6">{!isEnabled && enableButton}</div>
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

"use client"

import Image from "next/image"
import Slider from "react-slick"
import { useEffect, useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { LinkButton } from "@/components/LinkButton"
import { MarketplaceAppCard } from "@/types/marketplace"
import { Button } from "@/components/Button"

type MarketplaceAppCarouselProps = {
  title: string
  apps: MarketplaceAppCard[]
}

export const MarketplaceAppCarousel = ({
  title,
  apps,
}: MarketplaceAppCarouselProps) => {
  const carouselRef = useRef<Slider>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const { offsetWidth } = containerRef.current ?? {}

      if (offsetWidth) {
        setContainerWidth(offsetWidth)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="w-full" ref={containerRef}>
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-slate-900 dark:text-slate-50 text-2xl font-bold tracking-[-1px]">
          {title}
        </h2>
        <div className="flex flex-row items-center gap-2.5">
          <Button
            variant="border"
            size="sm"
            className="text-slate-900 dark:text-slate-50"
            aria-label="Previous slide"
            onClick={() => {
              carouselRef.current?.slickPrev()
            }}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="border"
            size="sm"
            className="text-slate-900 dark:text-slate-50"
            aria-label="Next slide"
            onClick={() => {
              carouselRef.current?.slickNext()
            }}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {containerWidth ? (
        <div
          className="w-full"
          style={containerWidth ? { width: containerWidth } : undefined}
        >
          {/* @ts-expect-error - the type definitions for react-slick are incorrect */}
          <Slider
            ref={carouselRef}
            className="h-full"
            centerPadding="0px"
            dots={false}
            arrows={false}
            infinite
            centerMode
            speed={500}
            slidesToShow={1}
          >
            {apps.map((app) => (
              <div key={app.id} className="h-full">
                <div className="w-full h-full relative flex flex-row items-center bg-slate-100 dark:bg-slate-800 rounded-[32px] overflow-hidden">
                  <div className="md:max-w-md lg:max-w-lg h-full w-full z-10">
                    <div className="w-full py-10 px-12 h-full text-center md:text-left">
                      <div className="w-[80px] min-w-[80px] aspect-square relative mx-auto md:mx-0">
                        {app.logo?.url ? (
                          <Image
                            src={app.logo.url}
                            alt={app.logo.alt ?? ""}
                            fill
                            className="object-contain rounded-2xl"
                          />
                        ) : (
                          <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-full w-full" />
                        )}
                      </div>
                      <h3 className="text-slate-900 text-2xl font-bold tracking-[-1px] mt-4">
                        {app.title}
                      </h3>
                      <p className="text-slate-500 mt-2 max-w-sm mx-auto md:mx-0 line-clamp-2">
                        {app.description}
                      </p>
                      <LinkButton
                        href={`/marketplace/apps/${app.slug}`}
                        className="mt-4 mx-auto md:mx-0"
                        size="md"
                      >
                        Explore
                      </LinkButton>
                    </div>
                  </div>
                  {!!app.heroImage?.url && (
                    <Image
                      src={app.heroImage.url}
                      alt=""
                      width={970}
                      height={312}
                      className="w-full h-full object-cover z-0 absolute top-0 right-0"
                    />
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="aspect-[2.8]" />
      )}
    </div>
  )
}

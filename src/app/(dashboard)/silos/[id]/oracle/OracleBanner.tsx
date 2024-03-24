import { OracleEnableButton } from "@/app/(dashboard)/silos/[id]/oracle/OracleEnableButton"
import { Button } from "@/components/Button"
import { CheckIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import Image from "next/image"

type OracleBannerProps = {
  siloId: number
  isActive?: boolean
}

const PARAGRAPH_TEXT_CLASSNAME = "text-gray-600"

export const OracleBanner = ({ siloId, isActive }: OracleBannerProps) => {
  return (
    <div className="relative overflow-hidden flex flex-row bg-white rounded-xl border shadow-sm px-4 py-5 sm:px-5 md:px-6 sm:py-6">
      <div className="flex-1 xl:pr-20">
        <h1 className="flex flex-wrap gap-x-1 lg:flex-col lg:gap-x-0 text-2xl md:text-4xl	font-bold text-gray-900">
          {isActive ? (
            <div className="flex flex-row items-center">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-green-400 rounded-full flex items-center justify-center mr-1.5 md:mr-2.5">
                <CheckIcon className="w-4 h-4 md:w-5 md:h-5 text-black" />
              </div>
              <span>Oracle is activated</span>
            </div>
          ) : (
            <>
              <span>Get started</span>
              <span>with Aurora Oracle</span>
            </>
          )}
        </h1>
        <p
          className={clsx(
            "xl:max-w-[500px] 2xl:max-w-[650px] mt-5",
            PARAGRAPH_TEXT_CLASSNAME,
          )}
        >
          Empower your smart contracts with reliable, low-latency market data
          from institutional sources. Build apps with high-fidelity oracle feeds
          designed for mission-critical systems.
        </p>
        <p className={clsx("mt-5", PARAGRAPH_TEXT_CLASSNAME)}>
          Aurora Cloud provides on its chains an interface with the Pyth Oracle.
        </p>
        <div className="inline-block mt-6">
          {!isActive && <OracleEnableButton siloId={siloId} />}
        </div>
      </div>
      <div className="hidden xl:block absolute top-[50%] -translate-y-1/2 right-12">
        <Image
          src="/static/images/oracle.png"
          alt="Aurora Oracle"
          width={280}
          height={320}
          className="flex-shrink-0"
        />
      </div>
    </div>
  )
}

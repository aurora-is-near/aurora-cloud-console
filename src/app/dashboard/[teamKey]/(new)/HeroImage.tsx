"use client"

import Image from "next/image"
import Lottie from "lottie-react"

import { useState } from "react"
import confettiLottieAnimation from "../../../../resources/animation/confetti.json"

type Props = {
  isDeploymentComplete: boolean
}

export const HeroImage = ({ isDeploymentComplete }: Props) => {
  const [wasDeploymentComplete] = useState(isDeploymentComplete)

  return (
    <div className="relative flex items-center justify-center w-[180px] h-[180px] xl:mr-16">
      <Image
        width="180"
        height="180"
        src={
          isDeploymentComplete
            ? "/static/v2/images/heroIcons/cloud.webp"
            : "/static/v2/images/heroIcons/cloud-dev.webp"
        }
        alt="Aurora Cloud"
        className="shadow-xl rounded-[2rem] z-10"
      />
      {/* Show the confetti animation when the deployment is first completed. */}
      {isDeploymentComplete && !wasDeploymentComplete && (
        <Lottie
          loop={2}
          animationData={confettiLottieAnimation}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "300px",
          }}
        />
      )}
    </div>
  )
}

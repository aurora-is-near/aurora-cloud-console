"use client"

import { useDarkMode } from "@/hooks/useDarkMode"
import SealCheck from "../../../../../public/static/image/icons/marketplace/seal-check.svg"
import SealCheckDark from "../../../../../public/static/image/icons/marketplace/seal-check-dark.svg"
import SealQuestion from "../../../../../public/static/image/icons/marketplace/seal-question.svg"
import SealQuestionDark from "../../../../../public/static/image/icons/marketplace/seal-question-dark.svg"

type SealProps = {
  variant: "check" | "question"
  className?: string
}

export const Seal = ({ variant, className }: SealProps) => {
  const { isDarkModeEnabled } = useDarkMode()

  if (variant === "check") {
    return isDarkModeEnabled ? (
      <SealCheckDark className={className} />
    ) : (
      <SealCheck className={className} />
    )
  }

  return isDarkModeEnabled ? (
    <SealQuestionDark className={className} />
  ) : (
    <SealQuestion className={className} />
  )
}

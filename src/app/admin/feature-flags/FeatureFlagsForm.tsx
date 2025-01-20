"use client"

import { sentenceCase } from "change-case"
import { HorizontalForm } from "@/components/HorizontalForm"
import { featureFlags } from "@/feature-flags/browser"
import { FeatureFlagId } from "@/types/feature-flags"
import { useFeatureFlags } from "@/hooks/useFeatureFlags"

export const FeatureFlagsForm = () => {
  const { flags } = useFeatureFlags()

  const submitHandler = (inputs: Record<string, boolean>) => {
    Object.entries(inputs).forEach(([id, value]) => {
      featureFlags.set(id as FeatureFlagId, value)
    })
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
      inputs={Object.entries(flags).map(([id, value]) => {
        return {
          name: id,
          label: sentenceCase(id),
          type: "toggle",
          defaultChecked: value,
        }
      })}
    />
  )
}

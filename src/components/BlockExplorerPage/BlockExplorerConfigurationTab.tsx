"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import type { Silo } from "@/types/types"

import { HorizontalInput } from "@/components/HorizontalInput"
import { logger } from "@/logger"
import { Button } from "@/components/Button"
import { SiloAsset } from "@/types/assets"
import { TabCard } from "@/components/TabCard/TabCard"

type Props = {
  silo: Silo
}

type Inputs = {
  network_logo: FileList
  network_logo_dark: FileList
  favicon: FileList
}

const uploadFile = async (silo: Silo, file: File, type: SiloAsset) => {
  const formData = new FormData()

  formData.append("file", file)
  formData.append("type", type)

  return fetch(`/api/silos/${silo.id}/assets`, {
    method: "POST",
    body: formData,
  })
}

export const BlockExplorerConfigurationTab = ({ silo }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const handleUpdateTeam: SubmitHandler<Inputs> = async ({ network_logo }) => {
    const [networkLogo] = network_logo

    try {
      await Promise.all([
        networkLogo ? uploadFile(silo, networkLogo, "network_logo") : undefined,
      ])
    } catch (error) {
      logger.error(error)
      toast.error("Failed to update Blockscout configuration.")

      return
    }

    toast.success("Blockscout configuration updated.")
  }

  return (
    <TabCard>
      <form onSubmit={handleSubmit(handleUpdateTeam)} className="space-y-4">
        <HorizontalInput
          id="network_logo"
          name="network_logo"
          type="file"
          label="Network logo"
          register={register}
        />
        <HorizontalInput
          id="network_logo_dark"
          name="network_logo_dark"
          type="file"
          label="Network logo (dark mode)"
          register={register}
        />
        <HorizontalInput
          id="favicon"
          name="favicon"
          type="file"
          label="Favicon"
          register={register}
        />
        <div className="flex justify-end pt-4">
          <Button loading={isSubmitting} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </TabCard>
  )
}

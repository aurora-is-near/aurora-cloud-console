"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import type { Silo } from "@/types/types"
import { logger } from "@/logger"
import { Button } from "@/components/Button"
import { SiloAsset } from "@/types/assets"
import { ConfigurationCard } from "@/components/ConfigurationCard"
import { Typography } from "@/uikit"
import { ImageUploadInput } from "@/components/ImageUploadInput"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { SiloContext } from "@/providers/SiloProvider"
import Card from "@/components/Card"
import { BrandAssetsConsumerIcon } from "@/app/dashboard/[teamKey]/silos/[id]/configuration/BrandAssetsConsumerIcon"
import LightModeIcon from "../../../../../../../public/static/icons/light-mode.svg"
import DarkModeIcon from "../../../../../../../public/static/icons/dark-mode.svg"
import {
  BlockExplorer,
  NearIntents,
  Trisolaris,
} from "../../../../../../../public/static/v2/images/menuIcons"

const NETWORK_IMAGE_SIZE = 300
const FAVICON_IMAGE_SIZE = 120

type Inputs = {
  network_logo: FileList
  network_logo_dark: FileList
  favicon: FileList
}

const uploadFile = async (
  silo: Silo,
  file: File,
  type: SiloAsset,
  width: number,
) => {
  const formData = new FormData()

  formData.append("file", file)
  formData.append("type", type)
  formData.append("width", String(width))

  return fetch(`/api/silos/${silo.id}/assets`, {
    method: "POST",
    body: formData,
  })
}

export const BrandAssetsTab = () => {
  const { silo } = useRequiredContext(SiloContext)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({
    network_logo,
    network_logo_dark,
    favicon,
  }) => {
    const [networkLogo] = network_logo
    const [networkLogoDark] = network_logo_dark
    const [faviconFile] = favicon

    try {
      await Promise.all([
        networkLogo
          ? uploadFile(silo, networkLogo, "network_logo", NETWORK_IMAGE_SIZE)
          : undefined,
        networkLogoDark
          ? uploadFile(
              silo,
              networkLogoDark,
              "network_logo_dark",
              NETWORK_IMAGE_SIZE,
            )
          : undefined,
        faviconFile
          ? uploadFile(silo, faviconFile, "favicon", FAVICON_IMAGE_SIZE)
          : undefined,
      ])
    } catch (error) {
      logger.error(error)
      toast.error("Failed to update brand assets.")

      return
    }

    toast.success("Brand assets updated.")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 sm:space-y-5 w-full"
    >
      <ConfigurationCard
        title="Blockchain symbol"
        description="Minimum 64x64 px, square format (png/jpg/svg)"
        belowDescription={
          <div className="flex flex-row gap-x-2">
            <BrandAssetsConsumerIcon icon={<BlockExplorer />}>
              Displayed in the top-left corner of the Block Explorer’s collapsed
              navigation and as a favicon on the browser tab.
            </BrandAssetsConsumerIcon>
            <BrandAssetsConsumerIcon icon={<NearIntents />}>
              Shown next to your blockchain name when users select a network for
              Near Intents deposits and withdrawals.
            </BrandAssetsConsumerIcon>
            <BrandAssetsConsumerIcon icon={<Trisolaris />}>
              Shown next to your blockchain name when users select a network for
              Trisolaris interactions.
            </BrandAssetsConsumerIcon>
          </div>
        }
      >
        <ImageUploadInput
          name="favicon"
          label="Favicon"
          register={register}
          defaultValue={silo.favicon}
        />
      </ConfigurationCard>
      <ConfigurationCard
        title="Blockchain logo"
        description="Minimum 240x48 px, transparent background (png/svg)"
        belowDescription={
          <div className="flex flex-row gap-x-2">
            <BrandAssetsConsumerIcon icon={<BlockExplorer />}>
              Displayed in the top-left corner of the Block Explorer navigation
              and is available in both light and dark mode.
            </BrandAssetsConsumerIcon>
          </div>
        }
      >
        <div className="flex flex-col">
          <ImageUploadInput
            name="network_logo"
            label="Logo, light mode"
            register={register}
            defaultValue={silo.network_logo}
            Icon={LightModeIcon}
          />
          <ImageUploadInput
            name="network_logo_dark"
            label="Log, dark mode"
            className="mt-2.5"
            register={register}
            defaultValue={silo.network_logo_dark}
            Icon={DarkModeIcon}
          />
        </div>
      </ConfigurationCard>
      <Card>
        <div className="flex justify-between items-center gap-x-4">
          <Typography variant="paragraph" size={4} className="text-slate-500">
            The changes will be visible within a minute.
          </Typography>
          <Button loading={isSubmitting} type="submit">
            Save changes
          </Button>
        </div>
      </Card>
    </form>
  )
}

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
import LightModeIcon from "../../../public/static/icons/light-mode.svg"
import DarkModeIcon from "../../../public/static/icons/dark-mode.svg"

const NETWORK_IMAGE_SIZE = 300
const FAVICON_IMAGE_SIZE = 120

type Props = {
  silo: Silo
}

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

export const BlockExplorerConfigurationTab = ({ silo }: Props) => {
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
      toast.error("Failed to update Blockscout configuration.")

      return
    }

    toast.success("Blockscout configuration updated.")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ConfigurationCard
        title="Customize your Block Explorer"
        description="Add your brand assets to represent your blockchain. Once uploaded, you can crop the images as required."
        footer={
          <div className="flex justify-between items-center gap-x-4">
            <Typography variant="paragraph" size={5} className="text-slate-500">
              The changes will be visible on your Block Explorer within a
              minute.
            </Typography>
            <Button loading={isSubmitting} type="submit">
              Upload to Block Explorer
            </Button>
          </div>
        }
      >
        <div className="flex flex-col">
          <Typography
            variant="label"
            size={3}
            className="text-slate-900 mb-1.5"
          >
            Blockchain logo
          </Typography>
          <Typography
            variant="paragraph"
            size={4}
            className="text-slate-500 mb-1"
          >
            Displayed in the top-left corner of the Block Explorer navigation.
          </Typography>
          <Typography
            variant="paragraph"
            size={5}
            className="text-slate-500 mb-2.5"
          >
            Minimum 240x48 px, transparent background (png/svg)
          </Typography>
          <ImageUploadInput
            name="network_logo"
            label="Light mode"
            register={register}
            defaultValue={silo.network_logo}
            Icon={LightModeIcon}
          />
          <ImageUploadInput
            name="network_logo_dark"
            label="Dark mode"
            className="mt-2.5"
            register={register}
            defaultValue={silo.network_logo_dark}
            Icon={DarkModeIcon}
          />
        </div>
        <div className="flex flex-col mt-12">
          <Typography
            variant="label"
            size={3}
            className="text-slate-900 mb-1.5"
          >
            Blockchain symbol / favicon
          </Typography>
          <Typography
            variant="paragraph"
            size={4}
            className="text-slate-500 mb-1"
          >
            Displayed in the top-left corner of the Block Explorer’s collapsed
            navigation and as a favicon on the browser tab.
          </Typography>
          <Typography
            variant="paragraph"
            size={5}
            className="text-slate-500 mb-2.5"
          >
            Minimum 60x60 px, transparent background (png/svg)
          </Typography>
          <ImageUploadInput
            name="favicon"
            label="Favicon"
            register={register}
            defaultValue={silo.favicon}
          />
        </div>
      </ConfigurationCard>
    </form>
  )
}

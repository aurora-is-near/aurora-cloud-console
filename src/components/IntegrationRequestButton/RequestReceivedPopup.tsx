import Image from "next/image"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Card, Typography } from "@/uikit"
import { LinkButton } from "@/components/LinkButton"

export const RequestReceivedPopup = ({
  link,
  close,
}: {
  link: string
  close: () => void
}) => {
  return (
    <>
      <div className="flex items-center justify-around z-50 top-0 left-0 fixed w-full h-screen opacity-50 backdrop-blur-lg bg-black" />
      <div className="flex items-center justify-around z-50 top-0 left-0 fixed w-full h-screen">
        <Card className="w-96 relative">
          <XMarkIcon
            onClick={close}
            className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
          />
          <div className="flex flex-col gap-3 items-center justify-center pt-6">
            <Image
              src="/static/images/aurora-wait.png"
              alt="Aurora Cloud Console"
              width={135}
              height={135}
            />
            <Typography size={3} variant="heading" className="text-center mt-3">
              We have received your request
            </Typography>
            <Typography
              variant="paragraph"
              size={4}
              className="text-center font-thin"
            >
              Your chain will be integrated within 1-2 business days. To enhance
              your visibility on Near Intents, be sure to upload your blockchain
              icon.
            </Typography>
            <LinkButton
              variant="border"
              size="lg"
              href={link}
              className="mt-3 w-full"
            >
              Upload blockchain icon
            </LinkButton>
          </div>
        </Card>
      </div>
    </>
  )
}

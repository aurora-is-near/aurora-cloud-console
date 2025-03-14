import CopyButton from "@/components/CopyButton"

type Props = {
  description?: string
}

export const CopyAction = ({ description }: Props) =>
  description && <CopyButton hasBorder value={description} />

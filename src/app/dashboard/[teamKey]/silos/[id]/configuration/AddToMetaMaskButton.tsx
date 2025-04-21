import { PlusIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { ButtonSize } from "@/types/buttons"

type AddToMetaMaskButtonProps = {
  onClick: () => void
  size?: ButtonSize
}

export const AddToMetaMaskButton = ({
  onClick,
  size,
}: AddToMetaMaskButtonProps) => (
  <Button size={size} onClick={onClick} variant="border">
    <PlusIcon className="w-4 h-4" />
    <span>Add to MetaMask</span>
  </Button>
)

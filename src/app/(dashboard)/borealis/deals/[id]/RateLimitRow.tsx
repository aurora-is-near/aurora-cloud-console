import ListItem from "@/components/ListItem"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

type RateLimitRowProps = {
  title: string
  subtitle: string
  onEditClick: () => void
}

export const RateLimitRow = ({
  title,
  subtitle,
  onEditClick,
}: RateLimitRowProps) => {
  return (
    <ul className="border-t divide-y">
      <ListItem>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
        <ListItem.Actions>
          <button
            onClick={onEditClick}
            className="text-gray-500 hover:text-gray-900"
          >
            <span className="sr-only">Edit rate limit</span>
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        </ListItem.Actions>
      </ListItem>
    </ul>
  )
}

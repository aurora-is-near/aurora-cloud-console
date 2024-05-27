type TagProps = {
  text: string
}

export const Tag = ({ text }: TagProps) => (
  <span className="text-gray-900 bg-cyan-100 rounded-md px-2 py-1 text-sm whitespace-nowrap font-medium">
    {text}
  </span>
)

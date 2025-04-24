import { useHtmlContent } from "../hooks/useHtmlContent"

type HtmlContentProps = {
  html?: string
  className?: string
}

export const HtmlContent = ({ html, className }: HtmlContentProps) => {
  const { content } = useHtmlContent(html)

  return <div className={className}>{content}</div>
}

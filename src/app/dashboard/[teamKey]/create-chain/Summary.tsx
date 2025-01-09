import type { PropsWithChildren } from "react"

import { Typography, Card } from "@/uikit"

type ItemProps = {
  value: string
  title: string
  bulletpoints?: string[]
}

const Container = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-6">{children}</div>
)

const Item = ({ title, value, bulletpoints }: ItemProps) => (
  <div className="flex justify-between">
    <div className="flex flex-col gap-2">
      <Typography variant="label" size={3}>
        {title}
      </Typography>
      {bulletpoints ? (
        <ul className="flex flex-col gap-1 pl-2">
          {bulletpoints.map((text) => (
            <li className="flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-slate-600" />
              <Typography
                variant="paragraph"
                size={4}
                className="text-slate-600"
              >
                {text}
              </Typography>
            </li>
          ))}
        </ul>
      ) : null}
    </div>

    <Typography variant="paragraph" size={4}>
      {value}
    </Typography>
  </div>
)

const Divider = () => <hr className="w-full h-[1px] bg-slate-200" />

type FooterProps = {
  text: string
  value: string
}

const Footer = ({ text, value }: FooterProps) => (
  <footer className="flex justify-between items-center">
    <Typography variant="label" size={2}>
      {text}
    </Typography>
    <Typography variant="label" size={2}>
      {value}
    </Typography>
  </footer>
)

export const Summary = Object.assign(Container, {
  Item,
  Divider,
  Footer,
})

import React from "react"

import { clsx } from "../clsx"
import { Card } from "../Card"
import type { ClassnameProps } from "../clsx"

import { Item } from "./Item"

type Props = ClassnameProps & {
  children: React.ReactElement[]
}

export const ListProgress = ({ children, className }: Props) => (
  <Card tag="ul" noPadding className={clsx("overflow-hidden", className)}>
    {React.Children.map(children, (child: React.ReactElement) => {
      if (child.type !== Item) {
        console.warn("ListProgress only accepts ListProgress.Item components")
      }
      return child
    })}
  </Card>
)

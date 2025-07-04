import React from "react"

import { logger } from "@/logger"

import { clsx } from "../clsx"
import { Card } from "../Card"
import type { ClassnameProps } from "../clsx"

import { Item } from "./Item"

type Props = ClassnameProps & {
  children: React.ReactElement[]
  testID?: string
}

export const ListProgress = ({ children, className, testID }: Props) => (
  <Card
    tag="ul"
    noPadding
    className={clsx("overflow-hidden", className)}
    testID={testID}
  >
    {React.Children.map(children, (child: React.ReactElement) => {
      if (child.type !== Item) {
        logger.warn("ListProgress only accepts ListProgress.Item components")
      }

      return child
    })}
  </Card>
)

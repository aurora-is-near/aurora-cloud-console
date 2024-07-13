"use client"

import { useEffect, useRef, useState } from "react"
import { quintInOut } from "eases"

type Props = {
  value: number
  speed?: number
}

const SIXTY_FPS = 1000 / 60

function formatNumber(renderValue: number) {
  let options

  if (renderValue < 1000) {
    options = { minimumFractionDigits: 0, maximumFractionDigits: 2 }
  } else {
    options = { maximumFractionDigits: 0 }
  }

  return renderValue.toLocaleString(undefined, options)
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}

const NumberEasing = ({ value, speed = 500 }: Props) => {
  const [renderValue, renderValueSet] = useState(value)
  const [lastTarget, lastTargetSet] = useState(value)

  const [lastUpdateTime, lastUpdateTimeSet] = useState(new Date().getTime())

  useEffect(() => {
    lastUpdateTimeSet(new Date().getTime() - SIXTY_FPS)
    lastTargetSet(renderValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useInterval(() => {
    const currentTime = new Date().getTime()
    const absoluteProgress = (currentTime - lastUpdateTime) / speed

    if (absoluteProgress >= 1) {
      renderValueSet(value)
    } else {
      const easedProgress = quintInOut(absoluteProgress)

      renderValueSet(lastTarget + (value - lastTarget) * easedProgress)
    }
  }, SIXTY_FPS)

  return (
    // Prevent Google Translate from manipulating the DOM potentially while the
    // `setInterval` is still running.
    <span className="notranslate">{formatNumber(renderValue)}</span>
  )
}

export default NumberEasing

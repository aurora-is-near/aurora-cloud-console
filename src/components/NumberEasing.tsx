"use client"

import { useEffect, useState, useRef } from "react"
import { quintInOut } from "eases"

type Props = {
  value: number
  speed?: number
  decimals?: number
}

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
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function NumberEasing({ value, speed = 500, decimals = 0 }: Props) {
  const [renderValue, renderValueSet] = useState(value)
  const [lastTarget, lastTargetSet] = useState(value)

  const [lastUpdateTime, lastUpdateTimeSet] = useState(new Date().getTime())

  useEffect(() => {
    lastUpdateTimeSet(new Date().getTime() - 16)
    lastTargetSet(renderValue)
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
  }, 16)

  return (
    // Prevent Google Translate from manipulating the DOM potentially while the
    // `setInterval` is still running.
    <span className="notranslate">{formatNumber(renderValue)}</span>
  )
}

export default NumberEasing

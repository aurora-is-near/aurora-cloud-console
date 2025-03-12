import baseClsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const clsx = (...classes: ClassValue[]) => twMerge(baseClsx(...classes))

export type ClassnameProps = {
  className?: string
}

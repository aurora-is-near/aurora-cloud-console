import { LIST_TYPES } from "@/constants/lists"

export type ListType = (typeof LIST_TYPES)[number]

export type ListMap = Record<ListType, number | null>

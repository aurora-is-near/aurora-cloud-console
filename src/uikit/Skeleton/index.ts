import { Skeleton as Base } from "./Skeleton"
import { SkeletonTable } from "./SkeletonTable"
import { SkeletonList } from "./SkeletonList"

export const Skeleton = Object.assign(Base, {
  Table: SkeletonTable,
  List: SkeletonList,
})

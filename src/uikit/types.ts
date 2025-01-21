export type HeroIcon = React.ComponentType<
  React.PropsWithoutRef<React.ComponentProps<"svg">> & {
    title?: string | undefined
    titleId?: string | undefined
  }
>

type _DeepPartialArray<T> = Array<DeepPartial<T>>
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Array<infer U>
    ? _DeepPartialArray<U>
    : T extends object
      ? _DeepPartialObject<T>
      : T | undefined

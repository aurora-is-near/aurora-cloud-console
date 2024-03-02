import {
  ProxyApiBaseVar,
  ProxyApiObject,
  ProxyApiPrimitiveVar,
  ProxyApiSetVar,
} from "@/types/proxy-api"

export const createProxyApiObject = (
  key: string,
  {
    StringVar,
    NumberVar,
    SetVar,
  }: {
    StringVar?: Partial<ProxyApiPrimitiveVar> & { value: string }
    NumberVar?: Partial<ProxyApiPrimitiveVar> & { value: string }
    SetVar?: Partial<ProxyApiSetVar>
  } = {},
): ProxyApiObject => {
  const baseVar: ProxyApiBaseVar = {
    template: "mock-template",
    time_meta: {
      last_write: "2021-01-01T00:00:00Z",
      creation_time: "2021-01-01T00:00:00Z",
      last_touch: "2021-01-01T00:00:00Z",
    },
  }

  return {
    key,
    Data: {
      NumberVar: NumberVar ? { ...baseVar, ...NumberVar } : undefined,
      StringVar: StringVar ? { ...baseVar, ...StringVar } : undefined,
      SetVar: SetVar ? { ...baseVar, ...SetVar } : undefined,
    },
  }
}

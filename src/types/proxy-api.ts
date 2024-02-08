type ProxyApiVarType = "number" | "string" | "set"

type ProxyApiVariableOperation = {
  op_type:
    | "set"
    | "reset"
    | "unset"
    | "set_value"
    | "add"
    | "subtract"
    | "insert"
    | "erase"
    | "draw"
  var_type: ProxyApiVarType
  var_key: string
  template_key?: string
  string_value?: string
  number_value?: number
  value_reset_policy?: "recreate"
}

type ProxyApiTemplateOperation = {
  op_type: "set_template"
  var_type: "number" | "string" | "bucket"
  template_key: string
  expiration_duration?: number
  touch_by_read?: boolean
  reset_duration_months?: number
  reset_duration_nanoseconds?: number
  bucket_fill_value?: number
  leak_duration_nano?: number
}

export type ProxyApiUpateOperation =
  | ProxyApiVariableOperation
  | ProxyApiTemplateOperation

export type ProxyApiViewOperation = {
  var_type?: ProxyApiVarType
  key?: string
  begin_key?: string
  end_key?: string
  keys_only?: boolean
  limit?: number
  elements_of_set?: string
}

export type ProxyApiVar = {
  template: string
  time_meta: {
    creation_time: string
    last_write: string
    last_touch: string
  }
  value: string
  last_reset?: string
}

export type ProxyApiObjectVarTypes = {
  StringVar: string
  NumberVar: number
}

export type ProxyApiObject = {
  key: string
  Data: Record<keyof ProxyApiObjectVarTypes, ProxyApiVar>
}

export type ProxyApiResponseObject = {
  limited: boolean
  objects: ProxyApiObject[]
}

export type ProxyApiResponse = {
  instance?: string
  clock?: string
  sequence?: number
  error: string
  responses?: ProxyApiResponseObject[]
}

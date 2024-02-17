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
  number_value?: number
  value_reset_policy?: "recreate"
  set_element?: string
  string_value?: string
}

type ProxyApiTemplateOperation = {
  op_type: "set_template"
  var_type: "number" | "string" | "bucket" | "set"
  template_key: string
  expiration_duration?: number
  touch_by_read?: boolean
  reset_duration_months?: number
  reset_duration_nanoseconds?: number
  bucket_fill_value?: number
  leak_duration_nano?: number
  set_element_expiration_duration?: number
  set_element_touch_by_read?: boolean
  currency?: "second"
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

type ProxyApiBaseVar = {
  template: string
  time_meta: {
    creation_time: string
    last_write: string
    last_touch: string
  }
}

type ProxyApiPrimitiveVar = ProxyApiBaseVar & {
  value: string
}

type ProxyApiSetVar = ProxyApiBaseVar & {
  last_reset?: string
  internal_id?: number
  length?: number
}

export type ProxyApiObjectVarTypes = {
  StringVar: ProxyApiPrimitiveVar
  NumberVar: ProxyApiPrimitiveVar
  SetVar: ProxyApiSetVar
}

type ProxyApiObject = {
  key: string
  Data: Partial<ProxyApiObjectVarTypes>
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

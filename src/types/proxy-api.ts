type ProxyApiVarType = "number" | "string" | "set"

export type ProxyApiVariableOperation = {
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
}

export type ProxyApiTemplateOperation = {
  op_type: "set_template"
  var_type: "number" | "string" | "bucket"
  template_key: string
  expiration_duration?: number
  touch_by_read?: boolean
  reset_duration_months?: number
  reset_duration_nanoseconds?: number
  bucket_fill_value?: number
  leak_duration_nano?: string
}

export type ProxyApiUpateOperation =
  | ProxyApiVariableOperation
  | ProxyApiTemplateOperation

export type ProxyApiViewOperation = {
  var_type: ProxyApiVarType
  key?: string
  begin_key?: string
  end_key?: string
  keys_only?: boolean
  limit?: number
  elements_of_set?: string
}

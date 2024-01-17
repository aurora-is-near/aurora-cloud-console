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
  var_type: "number" | "string" | "set"
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

export type ProxyApiOperation =
  | ProxyApiVariableOperation
  | ProxyApiTemplateOperation

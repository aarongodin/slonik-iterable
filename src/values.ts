import { sql, SqlTokenType } from "slonik"

import { translateValue, getValueFromResult } from "./translate"

export function fromObject(obj: Record<string, any>, translate = translateValue): SqlTokenType {
  const values = Object.keys(obj).map((identifier) => {
    const value = obj[identifier]
    return getValueFromResult(translate(identifier, value))
  })

  return sql.join(values, sql`, `)
}

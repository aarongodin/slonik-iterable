import { sql, SqlTokenType } from "slonik"

import { translateValue, getColumnNameFromResult, getValueFromResult } from "./translate"

export function fromObject(payload: Record<string, any>, translate = translateValue): SqlTokenType {
  const values = Object.values(
    Object.entries(payload).map(([column, value]) => {
      const translated = translate(column, value)
      return sql`${sql.identifier([getColumnNameFromResult(translated) ?? column])} = ${getValueFromResult(translated)}`
    }),
  )
  return sql.join(values, sql`, `)
}

export function fromMap(payload: Map<string, any>): SqlTokenType {
  return fromObject(Object.fromEntries(payload))
}

import { sql, SqlTokenType } from "slonik"

import { translateValue } from "./translate"

export function fromObject(payload: Record<string, any>, translate = translateValue): SqlTokenType {
  const values = Object.values(
    Object.entries(payload).map(([column, value]) => {
      return sql`${sql.identifier([column])} = ${translate(column, value)}`
    }),
  )
  return sql.join(values, sql`, `)
}

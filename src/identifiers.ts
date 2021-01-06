import { sql, ListSqlTokenType } from "slonik"

export function fromArray(identifiers: string[], tableName?: string): ListSqlTokenType {
  return sql.join(
    identifiers.map((ident) => {
      const idents = [ident]
      if (tableName) {
        idents.unshift(tableName)
      }
      return sql.identifier(idents)
    }),
    sql`, `,
  )
}

export function fromObject(obj: Record<string, any>, tableName?: string): ListSqlTokenType {
  return fromArray(Object.keys(obj), tableName)
}

import { SqlTokenType, ListSqlTokenType, ValueExpressionType } from "slonik"

declare module "slonik-iterable" {
  type TranslationResultWithColumn = [string, ValueExpressionType]
  type TranslateFn = (column: string, value: any) => ValueExpressionType | TranslationResultWithColumn

  interface Assignment {
    fromObject: (payload: Record<string, any>, translate?: TranslateFn) => SqlTokenType
  }

  interface Identifiers {
    fromArray: (identifers: string[], tableName?: string) => ListSqlTokenType
    fromObject: (obj: Record<string, any>, tableName?: string) => ListSqlTokenType
  }

  interface Values {
    fromObject: (obj: Record<string, any>, translate?: TranslateFn) => SqlTokenType
  }

  export const assignment: Assignment
  export const identifiers: Identifiers
  export const values: Values
}

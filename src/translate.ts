import { sql, ValueExpressionType } from "slonik"

type TranslationResult = ValueExpressionType | [string, ValueExpressionType]

export function translateValue(column: string, value: any): TranslationResult {
  let currentValue = value

  if (Array.isArray(currentValue)) {
    currentValue = sql.array(currentValue, "text")
  }

  return [column, currentValue]
}

export function getValueFromResult(translationResult: TranslationResult): ValueExpressionType {
  if (Array.isArray(translationResult)) {
    return translationResult[1]
  }

  return translationResult
}

export function getColumnNameFromResult(translationResult: TranslationResult): string | null {
  if (Array.isArray(translationResult)) {
    return (translationResult as [string, ValueExpressionType])[0]
  }

  return null
}

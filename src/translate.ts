import { sql, ValueExpressionType } from "slonik";

export function translateValue(
  column: string,
  value: any
): [string, ValueExpressionType] {
  let currentValue = value;

  if (Array.isArray(currentValue)) {
    currentValue = sql.array(currentValue, "text");
  }

  return [column, currentValue];
}

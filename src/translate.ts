import { sql, ValueExpressionType } from "slonik";

export function translateValue(
  column: string,
  value: any
): ValueExpressionType {
  let currentValue = value;

  if (Array.isArray(currentValue)) {
    currentValue = sql.array(currentValue, "text");
  }

  return currentValue;
}

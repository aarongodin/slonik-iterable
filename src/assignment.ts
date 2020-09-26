import { sql, SqlTokenType } from "slonik";
import { translateValue } from "./translate";

export function fromObject(
  payload: Record<string, any>,
  translate = translateValue
): SqlTokenType {
  const values = Object.values(
    Object.entries(payload).map(([column, value]) => {
      const [currentColumn, currentValue] = translate(column, value);
      return sql`${sql.identifier([currentColumn])} = ${currentValue}`;
    })
  );
  return sql.join(values, sql`, `);
}

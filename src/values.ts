import { sql, SqlTokenType } from "slonik";
import { translateValue } from "./translate";

export function fromObject(
  obj: Record<string, any>,
  translate = translateValue
): SqlTokenType {
  const values = Object.keys(obj).map((identifier) => {
    const value = obj[identifier];
    return translate(identifier, value)[1];
  });

  return sql.join(values, sql`, `);
}

import { sql } from "slonik"

import * as assignment from "./assignment"

describe("assignment helpers", () => {
  describe("fromObject()", () => {
    it("should return a constructed SqlTokenType", () => {
      const actual = assignment.fromObject({
        first: "my first value",
      })

      expect(actual).toMatchSnapshot()
    })

    it("should return a constructed SqlTokenType with basic type assumptions", () => {
      const actual = assignment.fromObject({
        first: "a string",
        second: 22,
      })

      expect(actual).toMatchSnapshot()
    })

    describe("given a custom translate function", () => {
      it("should return a constructed SqlTokenType", () => {
        const actual = assignment.fromObject(
          {
            customType: { iamJson: true },
            customType2: ["one", "two", "three"],
          },
          (column, value) => {
            if (column === "customType") {
              return sql.json(value)
            } else if (column === "customType2") {
              return sql.array(value, "text")
            } else {
              return value
            }
          },
        )

        expect(actual).toMatchSnapshot()
      })
    })
  })
})

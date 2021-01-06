import { translateValue } from "./translate"

describe("translate", () => {
  describe("translateValue()", () => {
    it("returns the current value given the value is not a special type", () => {
      const actual = translateValue("myCol", "just a string")
      expect(actual).toEqual("just a string")
    })

    it("returns a slonik array for values that are arrays", () => {
      const actual = translateValue("myCol", ["is", "an", "array!"])
      expect(actual).toMatchSnapshot()
    })
  })
})

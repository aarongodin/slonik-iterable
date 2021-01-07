import * as slonikIterable from "./"

describe("module index", () => {
  it("has members", () => {
    expect(slonikIterable).toEqual({
      assignment: expect.objectContaining({
        fromObject: expect.any(Function),
        fromMap: expect.any(Function),
      }),
      identifiers: expect.objectContaining({
        fromArray: expect.any(Function),
        fromObject: expect.any(Function),
        fromSet: expect.any(Function),
      }),
      values: expect.objectContaining({
        fromObject: expect.any(Function),
        fromMap: expect.any(Function),
      }),
    })
  })
})

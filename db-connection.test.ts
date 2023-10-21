import { connectToDb } from "./db-connection"

describe("connectToDb", () => {
  it("should connect to the database and return query results", async () => {
    const results = await connectToDb()
    expect(results).toEqual('[{"id":1,"sample":"Testing"}]')
  }, 15000)
})

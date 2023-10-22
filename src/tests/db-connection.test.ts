import { closeDbConnection, connectToDb, queryDb } from "../db/db-connection"

describe("connectToDb", () => {
  it("should connect to the database and return query results", async () => {
    const sequelize = await connectToDb()
    let results = await queryDb(sequelize)
    await closeDbConnection(sequelize)
    expect(results).toEqual('[{"id":1,"sample":"Testing"}]')
  }, 15000)
})

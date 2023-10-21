import mysql from "mysql"
import { getSecret } from "./google-api"

export async function connectToDb(): Promise<string> {
  const database = await getSecret("DB_NAME")
  const connection = mysql.createConnection({
    host: await getSecret("DB_SOCKET"),
    user: await getSecret("DB_USER"),
    password: await getSecret("DB_PASS"),
    database: database,
  })

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err)
      return
    }
    console.log("Connected to database!")
  })

  let res: string = ""
  await new Promise<void>((resolve, reject) => {
    connection.query(`SELECT * FROM ${database}.test`, (err, results) => {
      if (err) {
        console.error("Error querying database:", err)
        reject(err)
        return
      }
      console.log("Query results:", results)
      res = JSON.stringify(results)
      resolve()
    })
  })

  connection.end()
  return res
}

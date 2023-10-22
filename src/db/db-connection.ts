import mysql, { Connection } from "mysql"
import { getSecret } from "../apis/google-api"

export async function connectToDb(): Promise<Connection> {
  const database = await getSecret("DB_NAME")
  const connection = mysql.createConnection({
    host: await getSecret("DB_SOCKET"),
    user: await getSecret("DB_USER"),
    password: await getSecret("DB_PASS"),
    database: database,
  })

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database: ", err)
      return
    }
    console.log("Connected to database!")
  })

  return connection
}

export async function queryDb(sequelize: Connection): Promise<string> {
  try {
    return new Promise((resolve, reject) => {
      sequelize.query(`SELECT * FROM test`, (err, results) => {
        if (err) {
          reject(err)
        }

        console.log("Query results: ", results)
        resolve(JSON.stringify(results))
      })
    })
  } catch (err) {
    console.error("Error querying database: ", err)
    throw err
  }
}

export async function closeDbConnection(sequelize: Connection) {
  sequelize.end()
  console.log("DB Connection Closed!")
}

import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool({
  user: "postgres",
  host: "172.17.0.1",
  database: "Athletes",
  password: "postgres",
  port: "5432",
});
pool.on("connect", () => {
  console.log("connected to the Database");
});

export default pool;

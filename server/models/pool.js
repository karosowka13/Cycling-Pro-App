import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool({
  user: "postgres",
  host: "172.17.0.5",
  database: "Athlets",
  password: "postgres",
  port: "5432",
});

export default pool;
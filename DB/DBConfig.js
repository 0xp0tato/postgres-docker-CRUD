import pg from "pg";
import "dotenv/config";

const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

const Client = pg.Client;
const PGClient = new Client({
  user: POSTGRES_USER,
  host: "localhost",
  database: "test_db",
  password: POSTGRES_PASSWORD,
  port: 5432,
});

export { PGClient };

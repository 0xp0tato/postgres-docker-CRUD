import { PGClient } from "./DBConfig.js";

async function DBConnect() {
  try {
    await PGClient.connect();
    const tableExists = await checkTable();

    if (tableExists) console.log("'Students' table already exists and is ready to use");
    else {
      await PGClient.query(
        "CREATE TABLE students( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
      );
      console.log("Database Connected. Table name 'Students' is ready to use");
    }
  } catch (error) {
    console.log(error);
  }
}

async function checkTable() {
  try {
    const res = await PGClient.query(
      `SELECT EXISTS ( SELECT 1 FROM information_schema.tables WHERE table_name = 'students')`
    );

    return res.rows[0].exists;
  } catch (error) {
    console.log(error);
  }
}

export { DBConnect };

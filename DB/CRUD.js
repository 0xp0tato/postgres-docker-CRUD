import { PGClient } from "./DBConfig.js";

//Get all entries from table.
async function getData() {
  let response;

  try {
    const data = await PGClient.query("SELECT * FROM students");

    if (data.rows.length > 0)
      response = { status: 200, data: data.rows, message: "Query successfull" };
    else if (data.rows.length === 0)
      response = { status: 204, message: "Table is empty" };
    else {
      response = {
        status: 404,
        message: "Something went wrong. Please try again later.",
      };
    }

    return response;
  } catch (error) {
    console.log(error);
  }
}

//Insert an entry in table
async function insertData(name, address) {
  let response;

  try {
    await PGClient.query(
      `INSERT INTO students (name, address) VALUES ($1, $2)`,
      [name, address]
    );

    response = { status: 200, message: "Data entered successfully" };

    return response;
  } catch (error) {
    console.log(error);
  }
}

//Update an entry in table
async function updateData(name, address) {
  let response;

  try {
    await PGClient.query("UPDATE students SET address = $2 WHERE name = $1", [
      name,
      address,
    ]);

    response = { status: 200, message: "Data updated successfully" };
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(name) {
  let response;

  try {
    await PGClient.query("DELETE FROM students WHERE name = $1", [name]);

    response = { status: 200, message: "Data deleted successfully" };

    return response;
  } catch (error) {
    console.log(error);
  }
}

export { getData, insertData, updateData, deleteData };

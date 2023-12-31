import { DBConnect } from "./DB/DBConnect.js";
import express from "express";
import "dotenv/config";
import { deleteData, getData, insertData, updateData } from "./DB/CRUD.js";

const app = express();
app.use(express.json());
DBConnect();

const SERVER_PORT = process.env.SERVER_PORT;

//GET all table entries
app.get("/", async function (req, res) {
  const response = await getData();

  res.send(response);
});

//POST an entry in the table
app.post("/", async function (req, res) {
  const { name, address } = req.body;

  const response = await insertData(name, address);

  res.send(response);
});

//UPDATE an entry in the table
app.put("/", async function (req, res) {
  const { name, address } = req.body;

  const response = await updateData(name, address);

  res.send(response);
});

//DELETE an entry from the table
app.delete("/", async function (req, res) {
  const { name, address } = req.body;

  const response = await deleteData(name, address);

  res.send(response);
});

app.listen(SERVER_PORT, () =>
  console.log(`Sever started at http://localhost:${SERVER_PORT}`)
);

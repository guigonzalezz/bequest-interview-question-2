import express from "express";
import cors from "cors";
import crypto, { BinaryLike } from "crypto";

const PORT = 8080;
const app = express();
interface IDatabase { data: string, hash: string };
const database:IDatabase = { data: "Hello World", hash: "" };
const lastBackupDatabase:IDatabase = { data: "", hash: "" };

app.use(cors());
app.use(express.json());

const createHash = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Routes
app.get("/", (req, res) => {
  res.json(database);
});

app.post("/", (req, res) => {
  const { data } = req.body;
  const hash = createHash(data);
  database.data = data;
  database.hash = hash;
  lastBackupDatabase.data = data;
  lastBackupDatabase.hash = hash;
  res.sendStatus(200);
});

app.post("/verify", (req, res) => {
  const { data, hash } = database;
  const currentHash = createHash(data);
  res.json({ valid: currentHash === hash });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
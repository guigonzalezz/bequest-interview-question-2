import express from "express";
import cors from "cors";
import crypto from "crypto";

const PORT = 8080;
const app = express();
interface IDatabase { data: string, hash: string, signature: string };
const database:IDatabase = { data: "Hello World", hash: "", signature: "" };
const lastBackupDatabase:IDatabase = { data: "", hash: "", signature: "" };

app.use(cors());
app.use(express.json());

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const createHash = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

const signData = (data: string) => {
  const sign = crypto.createSign("SHA256");
  sign.update(data).end();
  return sign.sign(privateKey, "hex");
};

const verifySignature = (data: string, signature: string) => {
  const verify = crypto.createVerify("SHA256");
  verify.update(data);
  return verify.verify(publicKey, signature, "hex");
};

// Routes
app.get("/", (req, res) => {
  res.json(database);
});

app.post("/", (req, res) => {
  const { data } = req.body;
  const hash = createHash(data);
  const signature = signData(hash);

  database.data = data;
  database.hash = hash;
  database.signature = signature;

  lastBackupDatabase.data = data;
  lastBackupDatabase.hash = hash;
  lastBackupDatabase.signature = signature;

  res.sendStatus(200);
});

app.post("/verify", (req, res) => {
  const { data, hash, signature } = database;
  const currentHash = createHash(data);
  const valid = currentHash === hash && verifySignature(hash, signature);
  res.json({ valid });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
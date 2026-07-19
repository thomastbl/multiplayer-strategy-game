const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const port = 8080;
process.loadEnvFile();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Traduis une requête url-encoded en objet
app.use(express.urlencoded());

// Traduis une requête JSON en objet
app.use(express.json());

// Autorise le client à recevoir la réponse du serveur
app.use(cors({ origin: "http://localhost:5500" }));

async function signup(username, password) {
  const password_hash = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
    [username, password_hash],
  );
}

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  await signup(username, password);
  res.json({ message: "Inscription réussie" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

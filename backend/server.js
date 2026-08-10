const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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

// --------- Middlewares

// Traduis une requête url-encoded en objet
app.use(express.urlencoded());

// Traduis une requête JSON en objet
app.use(express.json());

// Autorise le client à recevoir la réponse du serveur
app.use(cors({ origin: "http://localhost:5500" }));

// Vérifie l'authenticité du token de connexion
function authenticateToken(token) {}

// --------- Fonctions métiers

async function signup(username, password) {
  const password_hash = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
    [username, password_hash],
  );
}

async function login(username, password) {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rows.length === 0) {
    return { match: false };
  }
  const match = await bcrypt.compare(password, result.rows[0].password_hash);
  return { match: match, id: result.rows[0].id };
}

// --------- Routes

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    await signup(username, password);
    res.status(200).json({ message: "Inscription réussie" });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Nom d'utilisateur déjà pris" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const success = await login(username, password);
    if (success.match) {
      const token = jwt.sign({ user_id: success.id }, process.env.JWT_KEY, {
        expiresIn: "12h",
      });
      res
        .status(200)
        .json({ connection: "connection authorized", token: token });
    } else {
      res.status(401).json({ connection: "connection unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

// ---------

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send(`Bonjour ${req.query.first_name}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

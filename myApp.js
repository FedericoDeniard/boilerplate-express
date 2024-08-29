let express = require("express");
let app = express();

console.log("Hello World");

module.exports = app;

app.get("/", (req, res) => {
  res.send("Hello Express");
});

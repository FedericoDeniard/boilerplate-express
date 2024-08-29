let express = require("express");
let app = express();
require("dotenv").config();

console.log("Hello World");

module.exports = app;

absolutePath = __dirname + "/views/index.html";

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  let objectJson = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE == "uppercase") {
    Object.keys(objectJson).array.forEach((element) => {
      objectJson[element] = objectJson[element].toUpperCase();
    });
  } else {
    objectJson;
  }
  res.json(objectJson);
});

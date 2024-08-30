let express = require("express");
let app = express();
require("dotenv").config();

console.log("Hello World");

module.exports = app;

absolutePath = __dirname + "/views/index.html";

app.use((req, res, next) => {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  let objectJson = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE == "uppercase") {
    Object.keys(objectJson).forEach((element) => {
      objectJson[element] = objectJson[element].toUpperCase();
    });
  }
  res.json(objectJson);
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

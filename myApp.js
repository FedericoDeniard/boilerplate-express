let express = require("express");
let app = express();
require("dotenv").config();

console.log("Hello World");

module.exports = app;

absolutePath = __dirname + "/views/index.html";

// Middleware
app.use((req, res, next) => {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

// Middleware con archivo
app.use("/public", express.static(__dirname + "/public"));

// Respuesta con archivo
app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

// Variables de entorno
app.get("/json", (req, res) => {
  let objectJson = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE == "uppercase") {
    Object.keys(objectJson).forEach((element) => {
      objectJson[element] = objectJson[element].toUpperCase();
    });
  }
  res.json(objectJson);
});

// Encadenamiento de funciones
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

// Obtener parámetros
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app
  .route("/name")
  .get((req, res) => {
    res.json({ name: req.query.first + " " + req.query.last });
  })
  .post();

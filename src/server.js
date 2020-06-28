const express = require('express');
const server = express();
const nunjucks = require("nunjucks");

// Configuring public folder
server.use(express.static("public"));

// Nunjucks template engine
nunjucks.configure("src/views", {
  express: server,
  noCahce: true
})/

// Without Nunjucks
// server.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html")
// })

server.get("/", (req, res) => {
  return res.render("index.html")
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
});

server.listen(3000);
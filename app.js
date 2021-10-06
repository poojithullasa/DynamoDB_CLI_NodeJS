const express = require("express");
const tableRoutes = require("./routes/table");
const itemRoutes = require("./routes/item");

const app = express();

app.use("/table", tableRoutes);
app.use("/item", itemRoutes);

app.get("/", (reqest, response) => {
  response.send("Welcome to IMDB cli. A tool to know about movies.");
});

module.exports = app;

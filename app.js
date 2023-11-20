const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { handleCustomErrors, handleWrongURLS } = require("./controllers/errors.controller");

const app = express();

app.get("/api/topics", getTopics);


app.get("/api/*", handleWrongURLS);
app.use(handleCustomErrors);

module.exports = app;

const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { handleWrongURLS } = require("./controllers/errors.controller");

const app = express();

app.get("/api/topics", getTopics);

app.all("/*", handleWrongURLS);

module.exports = app;

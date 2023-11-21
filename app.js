const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { handleWrongURLS } = require("./controllers/errors.controller");
const { getApi } = require("./controllers/api.controller");
const app = express();


app.get("/api/topics", getTopics);
app.get("/api",getApi)

app.all("/*", handleWrongURLS);

module.exports = app;

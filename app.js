const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const {
	handleWrongURLS,
	handleCustomErrors,
	handlePsqlErrors,
} = require("./controllers/errors.controller");
const { getArticlesById } = require("./controllers/articles.controller");

const app = express();
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_Id", getArticlesById);

app.all("/*", handleWrongURLS);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
module.exports = app;

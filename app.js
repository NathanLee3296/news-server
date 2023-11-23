const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const {
	handleWrongURLS,
	handleCustomErrors,
	handlePsqlErrors,
} = require("./controllers/errors.controller");
const {
	getArticlesById,
	getArticles,
	patchArticleById,
} = require("./controllers/articles.controller");
const { getApi } = require("./controllers/api.controller");

const { getCommentsByArticleID, postCommentByArticleId, removeCommentsById } = require("./controllers/comments.controller");


const app = express();
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_Id", getArticlesById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleID);
app.get("/api/articles", getArticles);
app.get("/api", getApi);

app.patch("/api/articles/:article_id", patchArticleById);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.delete("/api/comments/:comment_id", removeCommentsById)

app.all("/*", handleWrongURLS);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);



module.exports = app;


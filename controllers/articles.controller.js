const { createRef } = require("../db/seeds/utils");
const {
	selectArticleById,
	selectArticles,
	updateArticleVotes,
} = require("../models/articles.models");
const { selectCommentCounts } = require("../models/comments.model");

exports.getArticlesById = (req, res, next) => {
	return selectArticleById(req.params)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getArticles = (req, res, next) => {
	Promise.all([selectArticles(), selectCommentCounts()])
		.then((resolvedPromises) => {
			const articles = resolvedPromises[0];
			const refTable = createRef(resolvedPromises[1], "article_id", "count");
			articles.forEach((article) => {
				delete article.body;
				article["comment_count"] = refTable[article.article_id] || 0;
			});
			res.status(200).send({ articles });
		})
		.catch((err) => next(err));
};


exports.patchArticleById = (req, res, next) => {
	const { params, body } = req;
	return updateArticleVotes(params, body)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};




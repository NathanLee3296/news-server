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
	const { query } = req;
	selectArticles(query)
		.then((articles) => {
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

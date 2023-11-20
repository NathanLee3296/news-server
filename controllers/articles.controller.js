const { selectArticleById } = require("../models/articles.models");

exports.getArticlesById = (req, res, next) => {
	return selectArticleById(req.params)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};

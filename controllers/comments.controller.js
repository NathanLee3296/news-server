const { insertComment } = require("../models/comments.model");

exports.postCommentByArticleId = (req, res, next) => {
	const { params, body } = req;
	insertComment(params, body)
		.then((comment) => {
			res.status(201).send({ comment });
		})
		.catch((err) => {
			next(err);
		});
};

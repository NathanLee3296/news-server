
const { insertComment } = require("../models/comments.model");
const { selectCommentsByID } = require("../models/comments.model")

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
)


exports.getCommentsByArticleID = (req, res, next) => {
  selectCommentsByID(req.params).then((comments) => {
    res.status(200).send({comments})
  }).catch((err) => {
    next(err)
  })
} )

const { selectCommentsByID } = require("../models/api.comments")


exports.getCommentsByArticleID = (req, res, next) => {
  selectCommentsByID(req.params).then((comments) => {
    res.status(200).send({comments})
  }).catch((err) => {
    next(err)
  })
}
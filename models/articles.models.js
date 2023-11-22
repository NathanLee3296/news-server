const connection = require("../db/connection");

exports.selectArticleById = ({ article_Id }) => {
	return connection
		.query("SELECT * FROM articles WHERE article_id = $1", [article_Id])
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: "Wrong Input" });
			}
			return rows[0];
		});
};

exports.selectArticles = () => {
	return connection
		.query("SELECT * FROM articles ORDER BY created_at DESC")
		.then(({ rows }) => {
			return rows;
		});
};

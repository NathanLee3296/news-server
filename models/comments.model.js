const connection = require("../db/connection");

exports.selectCommentCounts = () => {
	return connection
		.query(`SELECT article_id, COUNT(*) FROM comments GROUP BY article_id;`)
		.then(({ rows }) => {
			return rows;
		});
};

exports.selectCommentsByID = ({ article_id }) => {
	return connection
		.query(
			"SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC ",
			[article_id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: "resource not found" });
			}
			return rows;
		});
};

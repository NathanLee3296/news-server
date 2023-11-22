const connection = require("../db/connection");

exports.selectCommentCounts = () => {
	return connection
		.query(`SELECT article_id, COUNT(*) FROM comments GROUP BY article_id;`)
		.then(({ rows }) => {
			return rows;
		});
};

exports.insertComment = (param, body) => {
	return connection
		.query(
			`INSERT INTO comments (author, body, article_id)
	VALUES 
	($1, $2, $3)
	RETURNING *
	`,
			[body.username, body.body, parseInt(param.article_id)]
		)
		.then(({ rows }) => {
			return rows[0];
		});
};

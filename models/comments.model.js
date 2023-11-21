const connection = require("../db/connection");

exports.selectCommentCounts = () => {
	return connection
		.query(`SELECT article_id, COUNT(*) FROM comments GROUP BY article_id;`)
		.then(({rows}) => {
			return rows;
		});
};

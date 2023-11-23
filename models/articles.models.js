const { error } = require("console");
const connection = require("../db/connection");

exports.selectArticleById = ({ article_Id }) => {
	return connection
		.query(
			`SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.*, articles.article_id`,
			[article_Id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: "Wrong Input" });
			}
			return rows[0];
		});
};

exports.selectArticles = (query) => {
	if (Object.entries(query) != 0 && !query.hasOwnProperty("topic")) {
		return Promise.reject({ status: 404, msg: "Invalid query type" });
	}

	const search = query.topic || null;

	return connection
		.query(
			`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.author) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id 
			WHERE articles.topic = COALESCE($1, articles.topic)
			GROUP BY articles.author,  articles.title,  articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ORDER BY created_at DESC;`,
			[search]
		)
		.then(({ rows }) => {
			const topicArray = ["mitch", "catch", "paper"];
			if (!rows.length && (!search || !topicArray.includes(search))) {
				return Promise.reject({ status: 404, msg: "resource not found" });
			}
			return rows;
		});
};

exports.updateArticleVotes = (params, body) => {
	return connection
		.query(
			"UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
			[body.inc_votes, params.article_id]
		)
		.then(({ rows }) => {
			if (!rows.length) {
				return Promise.reject({ status: 404, msg: "resource not found" });
			}
			return rows[0];
		})
		.catch((err) => {
			if (err.status === 404)
				return Promise.reject({ status: 404, msg: "resource not found" });
			else {
				return Promise.reject({ status: 400, msg: "Bad request" });
			}
		});
};

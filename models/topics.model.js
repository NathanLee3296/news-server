const connection = require("../db/connection");

exports.selectTopics = () => {
	return connection.query("SELECT * FROM topics").then(({ rows }) => {
		return rows;
	});
};

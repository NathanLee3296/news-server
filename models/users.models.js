const connection = require("../db/connection");

exports.selectUsers = () => {
	return connection.query("SELECT * FROM users").then(({ rows }) => {
		return rows;
	});
};

const connection = require("../db/connection");



exports.selectTopics = () => {
	return connection.query("SELECT * FROM topics").then(({rows}) => {
    return rows;
  }).catch((err) => {
    return err;
    return Promise.reject(
      {
        status : 503,
        msg : "Service Unavailable"
      }
    )
  })
};

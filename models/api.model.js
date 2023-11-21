const fs = require("fs/promises");

exports.readEndpoints = () => {
	return fs.readFile(`${__dirname}/../endpoints.json`,"utf8")
  .then((data) => {
    return JSON.parse(data)
  });
};

const { readEndpoints } = require("../models/api.model");

exports.getApi = (req, res, next) => {
	return readEndpoints()
		.then((api) => {
			res.status(200).send(api);
		})
		.catch((err) => {
			next(err);
		});
};

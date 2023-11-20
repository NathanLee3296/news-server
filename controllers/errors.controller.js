exports.handleWrongURLS = (req, res, next) => {
	res.status(404).send("Bad Request: Invalid URL")
};

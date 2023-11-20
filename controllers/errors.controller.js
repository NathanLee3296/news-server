exports.handleWrongURLS = (req, res, next) => {
	res.status(400).send("Bad Request: Invalid URL")
};

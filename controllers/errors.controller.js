exports.handleWrongURLS = (req, res, next) => {
	res.status(404).send("Bad Request: Invalid URL");
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(404).send({ msg: "Bad request" });
  } else next(err);
};



exports.handleCustomErrors = (err, req, res, next) => {
	if (err.status) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
};

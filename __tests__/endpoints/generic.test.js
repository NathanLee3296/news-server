const { app, data, seed, db, request } = require("../../testImports");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/* - will return an error 400 with a suitable message when an incorrect endpoint is used", () => {
	test("GET: 400 Returns an error if incorrect path is used", () => {
		return request(app)
			.get("/foobar")
			.expect(400)
			.then(({ text }) => {
				expect(text).toBe("Bad Request: Invalid URL");
			});
	});
});

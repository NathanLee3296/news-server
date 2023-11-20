const { app, data, seed, db, request } = require("../../testImports");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/* - will return an error 404 with a suitable message when an incorrect endpoint is used", () => {
	test("GET: 404 Returns an error if incorrect path is used", () => {
		return request(app)
			.get("/foobar")
			.expect(404)
			.then(({ text }) => {
				expect(text).toBe("Bad Request: Invalid URL");
			});
	});
});

describe("GET /api", () => {
	test("GET: 200 should return an object describing all the available endpoints on the API ", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then(({ body }) => {
				for (const property in body) {
					expect(body[property]).toHaveProperty("description");
					expect(body[property]).toHaveProperty("queries");
					expect(body[property]).toHaveProperty("exampleResponse");
				}
			});
	});
});

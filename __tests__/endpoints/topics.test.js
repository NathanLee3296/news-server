const { app, data, seed, db, request } = require("../../testImports");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/topics", () => {
	test("GET: 200 sends an array of topics to the client", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then(({ body: { topics } }) => {
				expect(topics.length).toBe(3);
				expect(topics).toMatchObject(data.topicData);
			});
	});
});

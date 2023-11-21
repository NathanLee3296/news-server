const { app, data, seed, db, request } = require("../testImports");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/articles/:article_id", () => {
	test("GET: 200 - Return an article object to the client using an ID param", () => {
		return request(app)
			.get("/api/articles/1")
			.expect(200)
			.then(({ body: { article } }) => {
				expect(article).toMatchObject({
					article_id: 1,
					title: "Living in the shadow of a great man",
					topic: "mitch",
					author: "butter_bridge",
					body: "I find this existence challenging",
					created_at: "2020-07-09T20:11:00.000Z",
					votes: 100,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
				});
			});
	});
	test("GET: 404 - Returns a 404 error if the number inputted is not a valid ID", () => {
		return request(app)
			.get("/api/articles/1111")
			.expect(404)
			.then(({ body }) => {
				expect(body).toEqual({ msg: "Wrong Input" });
			});
	});
	test("GET: 400 - Returns a 400 error as the client did not enter a number ", () => {
		return request(app)
			.get("/api/articles/turtles")
			.expect(400)
			.then(({ body }) => {
				expect(body).toEqual({ msg: "Bad request" });
			});
	});
});

describe("/api/topics", () => {
	test("GET: 200 sends an array of topics to the client", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then(({ body: { topics } }) => {
				expect(topics.length).toBe(3);
				topics.forEach((topic) => {
					expect(topic).toHaveProperty("slug");
					expect(typeof topic.slug).toBe("string");
					expect(topic).toHaveProperty("description");
					expect(typeof topic.description).toBe("string");
				});
			});
	});
});

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

const { app, data, seed, db, request } = require("../testImports");
const jsonEndpoints = require("../endpoints.json");
const { expect } = require("@jest/globals");

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
	test("GET: 400 - Returns a 404 error as the client did not enter a number ", () => {
		return request(app)
			.get("/api/articles/turtles")
			.expect(404)
			.then(({ body }) => {
				expect(body).toEqual({ msg: "Bad request" });
			});
	});
});
describe("/api/articles/:article_id/comments", () => {
	test("GET 200: Serve all comments for a specified article to the client", () => {
		return request(app)
			.get("/api/articles/1/comments")
			.expect(200)
			.then(({ body: { comments } }) => {
				expect(comments.length).toBe(11);
				expect(comments).toBeSorted({ key: "created_at", descending: true });
				comments.forEach((comment) => {
					expect(comment).toMatchObject({
						body: expect.any(String),
						votes: expect.any(Number),
						author: expect.any(String),
						article_id: 1,
						created_at: expect.any(String),
					});
				});
			});
	});
	test("GET 404: Respond with an error if articleID is a number but not valid", () => {
		return request(app).get("/api/articles/404/comments").expect(404);
	});
	test("GET: 404 Respond with an error if incorrect data type is used", () => {
		return request(app)
			.get("/api/articles/hello/comments")
			.expect(404)
			.then(({ body }) => {
				expect(body).toEqual({ msg: "Bad request" });
			});
	});
});

describe("api/articles", () => {
	test("GET: 200 send an array of article objects to the client", () => {
		return request(app)
			.get("/api/articles")
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles).toBeSorted({ key: "created_at", descending: true });
				articles.forEach((article) => {
					expect(article).toHaveProperty("author");
					expect(article).toHaveProperty("title");
					expect(article).toHaveProperty("article_id");
					expect(article).toHaveProperty("topic");
					expect(article).toHaveProperty("created_at");
					expect(article).toHaveProperty("votes");
					expect(article).toHaveProperty("comment_count");
				});
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
describe("GET /api", () => {
	test("GET: 200 should return an object describing all the available endpoints on the API ", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then(({ body }) => {
				expect(body).toMatchObject(jsonEndpoints);
			});
	});
});

describe("PATCH: /api/articles/:article_id ", () => {
	test("PATCH: 200 increase votes ", () => {
		return request(app)
			.patch("/api/articles/1")
			.send({ inc_votes: 50 })
			.expect(200)
			.then(({ body }) => {
				expect(body).toMatchObject({
					article: {
						article_id: 1,
						title: "Living in the shadow of a great man",
						topic: "mitch",
						author: "butter_bridge",
						body: "I find this existence challenging",
						created_at: "2020-07-09T20:11:00.000Z",
						votes: 150,
						article_img_url:
							"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					},
				});
			});
	});
	test("PATCH: 200 decrease votes to a negative number", () => {
		return request(app)
			.patch("/api/articles/1")
			.send({ inc_votes: -500 })
			.expect(200)
			.then(({ body }) => {
				expect(body).toMatchObject({
					article: {
						article_id: 1,
						title: "Living in the shadow of a great man",
						topic: "mitch",
						author: "butter_bridge",
						body: "I find this existence challenging",
						created_at: "2020-07-09T20:11:00.000Z",
						votes: -400,
						article_img_url:
							"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					},
				});
			});
	});
	test("PATCH: 404 if the client sends a non-number as the value", () => {
		return request(app)
			.patch("/api/articles/1")
			.send({ inc_votes: "tony" })
			.expect(404)
			.then(({ body }) => {
				expect(body).toMatchObject({ msg: "Bad request" });
			});
	});
	test("PATCH: 404 if the client send an incorrect article_id", () => {
		return request(app)
			.patch("/api/articles/404")
			.send({ inc_votes: 10 })
			.expect(404)
			.then(({ body }) => {
				expect(body).toMatchObject({ msg: "resource not found" });
			});
	});
	test("PATCH: 404 if the client send an SQL injection", () => {
		return request(app)
			.patch("/api/articles/1")
			.send({ inc_votes: ";DROP Table comments;" })
			.expect(404)
			.then(({ body }) => {
				expect(body).toMatchObject({ msg: "Bad request" });
			});
	});
});

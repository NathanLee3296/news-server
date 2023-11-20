const { app, data, seed, db, request } = require("../../testImports");

describe("/api/articles/:article_id", () => {
	test("GET: 200 - Return an article object to the client using an ID param", () => {
		return request(app)
			.get("/api/articles/1")
			.expect(200)
			.then(({ body }) => {
				expect(body).toMatchObject({
					article: [
						{
							article_id: 1,
							title: "Living in the shadow of a great man",
							topic: "mitch",
							author: "butter_bridge",
							body: "I find this existence challenging",
							created_at: "2020-07-09T20:11:00.000Z",
							votes: 100,
							article_img_url:
								"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
						},
					],
				});
			});
	});
	test("GET: 400 - Returns a 400 error if the number inputted is not a valid ID", () => {
		return request(app)
			.get("/api/articles/1111")
			.expect(400)
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

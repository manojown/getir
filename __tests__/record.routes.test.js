const request = require("supertest");
const { recordMocks } = require("../__mocks__/record.mocks");
const app = require("../app");

describe("Record api Endpoints", () => {
	it("should get a records", async () => {
		let { input, output } = recordMocks.getAllRecord;
		let { statusCode, contain } = output;
		const res = await request(app).post("/api/record").send(input);
		expect(res.statusCode).toEqual(statusCode);
		expect(res.body).toHaveProperty(contain);
	});

	it("should get a error because of endDate missing", async () => {
		let { input, output } = recordMocks.withoutEndDate;
		let { code, contain } = output;
		const res = await request(app).post("/api/record").send(input);
		expect(res.body.code).toEqual(code);
		expect(res.body.message).toEqual(contain);
	});

	it("should get not found when unknown routes hit", async () => {
		let { input, output } = recordMocks.routeNotFound;
		let { code, contain } = output;
		const res = await request(app).post("/record").send(input);
		expect(res.body).toHaveProperty(contain);
		expect(res.body.code).toEqual(code);
	});
});

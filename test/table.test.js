const request = require("supertest");
const app = require("../app");

afterAll(async () => {
  await request(app).delete("/table/delete");
});

describe("POST /table/create", () => {
  test("Is it successfully creating a table?", async () => {
    const response = await request(app).post("/table/create");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Created Table");
  });
  test("Is it throwing error, if table is already created?", async () => {
    const response = await request(app).post("/table/create");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Create Table");
  });
});

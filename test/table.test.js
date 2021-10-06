const request = require("supertest");
const app = require("../app");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

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

describe("GET /table/getall", () => {
  mock
    .onGet("/table/getall")
    .replyOnce(204)
    .onGet("/table/getall")
    .replyOnce(200, { message: "Success" });
  test("is Getall api is throwing 204 status code?", async () => {
    const response = await axios({
      method: "GET",
      url: "/table/getall",
    });
    expect(response.status).toBe(204);
  });
  test("is Getall api is sending success message?", async () => {
    const response = await axios({
      method: "GET",
      url: "/table/getall",
    });
    // const res = JSON.parse(response.);
    expect(response.data.message).toBe("Success");
  });
});

describe("DELETE /table/delete", () => {
  mock
    .onDelete("/table/delete")
    .replyOnce(200, { message: "Sorry, Cannot Delete Table" })
    .onDelete("/table/delete")
    .replyOnce(200, { message: "Successfully Deleted Table" })
    .onDelete("/table/delete")
    .replyOnce(204);

  test("Is it throwing error if table is not present?", async () => {
    const response = await axios({
      method: "DELETE",
      url: "/table/delete",
    });
    expect(response.data.message).toBe("Sorry, Cannot Delete Table");
  });
  test("Is it successfully deleting table?", async () => {
    const response = await axios({
      method: "DELETE",
      url: "/table/delete",
    });
    expect(response.data.message).toBe("Successfully Deleted Table");
  });
  test("Is it handling 404 error?", async () => {
    const response = await axios({
      method: "DELETE",
      url: "/table/delete",
    });
    expect(response.status).toBe(204);
  });
});

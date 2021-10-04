const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
  await request(app).post("/table/create");
});

afterAll(async () => {
  await request(app).delete("/table/delete");
});

describe("POST /item/add", () => {
  test("Is it successfully adding an item?", async () => {
    const response = await request(app).post(
      "/item/add/2021&Love Story&A Feel Good Movie&10"
    );
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Added Item");
  });
  test("Is it throwing error, if item is not present?", async () => {
    const response = await request(app).post(
      "/item/add/2021&Love Story&A Feel Good Movie&10"
    );
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Item Already Exists");
  });
  test("Is it throwing error, if item is not passes with wrong values?", async () => {
    const response = await request(app).post(
      "/item/add/2021&Love Story&A Feel Good Movie&ten"
    );
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Add Item");
  });
});

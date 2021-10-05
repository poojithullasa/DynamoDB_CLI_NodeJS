const request = require("supertest");
const app = require("../app");
const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const mock = new MockAdapter(axios);

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

describe("GET /item/read", () => {
  test("Can we read item from the table?", async () => {
    const response = await request(app).get("/item/read/2021&Love Story");
    const res = JSON.parse(response.text);
    expect(res.data.Item.title).toBe("Love Story");
  });
});

describe("GET /item/contains", () => {
  const usersUri = "/item/contains";
  const url = new RegExp(`${usersUri}/*`);
  const output = {
    message: "Successfully got all items",
    data: [
      {
        title: "Love Story",
        year: 2021,
        plot: "A Feel Good Movie",
        ratings: 10,
      },
    ],
  };
  mock.onGet(url).replyOnce(200, output);
  test("Can we get all items matching the containing title?", async () => {
    const response = await axios({
      method: "GET",
      url: "/item/contains/Iron",
    });
    expect(response.data.data[0].title).toBe("Love Story");
  });
});

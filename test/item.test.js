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

describe("GET /item/read", () => {
  test("Can we read item from the table?", async () => {
    const response = await request(app).get("/item/read/2021&Love Story");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Read Item");
  });
  test("Can we read item from the table if not present?", async () => {
    const response = await request(app).get("/item/read/li&Love Story");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Read Item");
  });
});

describe("PATCH /item/update", () => {
  test("Can we update item from the table?", async () => {
    const response = await request(app).patch(
      "/item/update/2021&Love Story&Good Movie&10&lop"
    );
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Updated Item");
  });
  test("Can we update item from the table if not present?", async () => {
    const response = await request(app).patch(
      "/item/update/li&Love Story&Good Movie&10&lop"
    );
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Update Item");
  });
});

describe("DELETE /item/remove", () => {
  test("Can we remove item from the table?", async () => {
    const response = await request(app).delete("/item/remove/2021&Love Story");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Delete Item");
  });
  test("Can we remove item from the table if not present?", async () => {
    const response = await request(app).delete("/item/remove/li&Love Story");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Delete Item");
  });
});

describe("GET /item/contains", () => {
  test("Can we get contains from the table?", async () => {
    const response = await request(app).get("/item/contains/Love Story");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Scanned Contains in Table");
  });
  test("Are we able to delete table?", async () => {
    const response = await request(app).delete("/table/delete");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Deleted Table");
  });
  test("Can we get contains from the table if error value is passed?", async () => {
    const response = await request(app).get("/item/contains/ p");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Scan Contains in Table");
  });
  test("Is it successfully creating a table?", async () => {
    const response = await request(app).post("/table/create");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Created Table");
  });
});

describe("GET /item/starts", () => {
  test("Can we get starts with item from the table?", async () => {
    const response = await request(app).get("/item/starts/Love&2021");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Queried Starts With");
  });
  test("Can we get starts with item from the table if error value is passed?", async () => {
    const response = await request(app).get("/item/starts/p&p");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Query Starts With");
  });
});

describe("GET /item/equals", () => {
  test("Can we get equals with item from the table?", async () => {
    const response = await request(app).get("/item/equals/021");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Queried Equals");
  });
  test("Can we get equals with item from the table if error value is passed?", async () => {
    const response = await request(app).get("/item/equals/p");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Query Equals");
  });
});

describe("GET /item/filter", () => {
  test("Can we get filter items from the table?", async () => {
    const response = await request(app).get("/item/filter/Drama");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Filtered Items in Table");
  });
  test("Are we able to delete table?", async () => {
    const response = await request(app).delete("/table/delete");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Deleted Table");
  });
  test("Can we get filter items from the table if error value is passed?", async () => {
    const response = await request(app).get("/item/filter/2222");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Filter Items in Table");
  });
  test("Is it successfully creating a table?", async () => {
    const response = await request(app).post("/table/create");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Created Table");
  });
});

describe("GET /", () => {
  test("Can we able to access other routes?", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe(
      "Welcome to IMDB cli. A tool to know about movies."
    );
  });
});

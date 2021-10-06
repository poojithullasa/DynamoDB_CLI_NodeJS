const request = require("supertest");
const app = require("../app");

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

describe("POST /table/load", () => {
  test("is application able to load data if successfully created?", async () => {
    const response = await request(app).post("/table/load");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Loaded Table with Sample Data");
  });
});

describe("Success Cases", () => {
  test("Are we getting all items from the table?", async () => {
    const response = await request(app).get("/table/getall");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully got all Items in the Table");
  });
  test("Are we able to delete table?", async () => {
    const response = await request(app).delete("/table/delete");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Successfully Deleted Table");
  });
});

describe("Error Cases", () => {
  test("Did we get error if items are not present?", async () => {
    const response = await request(app).get("/table/getall");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot get all Items in the Table");
  });
  test("Is it throwing error if table is not present?", async () => {
    const response = await request(app).delete("/table/delete");
    const res = JSON.parse(response.text);
    expect(res.message).toBe("Sorry, Cannot Delete Table");
  });
});

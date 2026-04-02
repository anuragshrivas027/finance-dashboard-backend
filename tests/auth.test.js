import request from "supertest";
import app from "../server.js";

describe("Auth API", () => {
  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.statusCode).toBe(404);
  });
});
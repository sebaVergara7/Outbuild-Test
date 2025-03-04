import request from "supertest";
import app from "../src/app";
import { randomUUID } from "crypto";
import { randomEmail, randomPassword } from "./testUtils";
import { HTTP_STATUS_CODES } from "../src/constants/httpStatusCodes";

describe("Auth API", () => {
  const email = randomEmail();
  const password = randomPassword();
  const uuid = randomUUID();

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password });

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED);
    expect(res.body.userId).toBeDefined();
  });

  it("should advice that the user already exists", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password });

    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    expect(res.status).toBe(HTTP_STATUS_CODES.OK);
    expect(res.body.token).toBeDefined();
  });

  it("should deny access without a token", async () => {
    const res = await request(app).get(`/api/schedules/${uuid}`);
    expect(res.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED);
  });
});

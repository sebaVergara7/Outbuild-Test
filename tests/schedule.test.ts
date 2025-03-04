import request from "supertest";
import app from "../src/app";
import {
  randomEmail,
  randomPassword,
  registerAndLoginTestUser,
} from "./testUtils";
import { HTTP_STATUS_CODES } from "../src/constants/httpStatusCodes";

describe("Schedule API", () => {
  let token: string;
  let scheduleId: string;
  const email = randomEmail();
  const password = randomPassword();

  beforeAll(async () => {
    token = await registerAndLoginTestUser(email, password);
  });

  it("should create a schedule", async () => {
    const res = await request(app)
      .post("/api/schedules")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Project A", imageUrl: "http://example.com/image.jpg" });

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED);
    expect(res.body.id).toBeDefined();
    scheduleId = res.body.id;
  });

  it("should get a schedule", async () => {
    const res = await request(app)
      .get(`/api/schedules/${scheduleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(HTTP_STATUS_CODES.OK);
    expect(res.body.name).toBe("Project A");
  });

  it("should get all schedules by user", async () => {
    const res = await request(app)
      .get("/api/schedules")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(HTTP_STATUS_CODES.OK);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Project A");
  });
});

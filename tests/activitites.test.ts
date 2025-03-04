import request from "supertest";
import app from "../src/app";
import {
  createRandomActivity,
  createSchedule,
  randomEmail,
  randomPassword,
  registerAndLoginTestUser,
} from "./testUtils";
import { randomUUID } from "crypto";
import { HTTP_STATUS_CODES } from "../src/constants/httpStatusCodes";

describe("Activities API", () => {
  let token: string;
  let scheduleId: string;
  const activitiesLength = 5;
  const email = randomEmail();
  const password = randomPassword();

  beforeAll(async () => {
    token = await registerAndLoginTestUser(email, password);
    scheduleId = await createSchedule(token);
  });

  it("should create an activity", async () => {
    const res = await request(app)
      .post("/api/activities")
      .set("Authorization", `Bearer ${token}`)
      .send(createRandomActivity(scheduleId));

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED);
    expect(res.body.id).toBeDefined();
  });

  it("should create multiple activities", async () => {
    const activities = Array.from({ length: activitiesLength }, (_, _i) =>
      createRandomActivity(scheduleId)
    );

    const res = await request(app)
      .post("/api/activities/bulk")
      .set("Authorization", `Bearer ${token}`)
      .send({ scheduleId, activities });

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED);
    expect(res.body.count).toBe(activitiesLength);
  });

  it("should get all activities by schedule", async () => {
    const res = await request(app)
      .get(`/api/activities/${scheduleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(HTTP_STATUS_CODES.OK);
    expect(res.body).toHaveLength(activitiesLength + 1);
  });
});

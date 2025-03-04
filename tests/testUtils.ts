import request from "supertest";
import app from "../src/app";
import { randomUUID } from "crypto";

export const randomEmail = (): string => {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}@test.com`;
};

export const randomPassword = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const registerAndLoginTestUser = async (
  email: string,
  password: string
) => {
  await request(app)
    .post("/api/auth/register")
    .send({ email, password })
    .catch(() => {});

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password });

  return res.body.token;
};

export const createSchedule = async (token: string) => {
  const res = await request(app)
    .post("/api/schedules")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: `Schedule-${randomUUID()}`,
      imageUrl: "http://example.com/image.jpg",
    });

  return res.body.id;
};

export const createRandomActivity = (scheduleId: string) => {
  const randomDuration = Math.random() * 9000;

  return {
    scheduleId,
    name: `Activity-${randomUUID()}`,
    startDate: new Date(),
    endDate: new Date(Date.now() + randomDuration),
  };
};

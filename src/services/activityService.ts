import { PrismaClient } from "@prisma/client";
import { CreateActivityDto } from "../dto/activity.dto";

const prisma = new PrismaClient();

export const addActivity = async (
  userId: string,
  scheduleId: string,
  name: string,
  startDate: Date,
  endDate: Date
) => {
  return prisma.$transaction(async (prisma) => {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId, userId },
    });

    if (!schedule) throw new Error("Schedule not found");

    return prisma.activity.create({
      data: {
        scheduleId,
        name,
        startDate,
        endDate,
      },
    });
  });
};

export const getActivitiesBySchedule = async (
  userId: string,
  scheduleId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const activities = await prisma.activity.findMany({
    where: {
      schedule: {
        id: scheduleId,
        userId,
      },
    },
    orderBy: { startDate: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  if (activities.length === 0) {
    throw new Error("Schedule not found");
  }

  return activities;
};

export const addMultipleActivities = async (
  userId: string,
  scheduleId: string,
  activities: CreateActivityDto[]
) => {
  return prisma.$transaction(async (prisma) => {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId, userId },
    });

    if (!schedule) throw new Error("Schedule not found");

    const data = activities.map((activity) => ({
      ...activity,
      scheduleId,
      startDate: new Date(activity.startDate).toISOString(),
      endDate: new Date(activity.endDate).toISOString(),
    }));

    return prisma.activity.createMany({ data });
  });
};

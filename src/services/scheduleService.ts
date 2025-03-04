import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSchedule = async (
  name: string,
  imageUrl: string,
  userId: string
) => {
  return prisma.schedule.create({
    data: {
      name,
      imageUrl,
      userId,
    },
  });
};

export const getScheduleById = async (
  scheduleId: string,
  userId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return prisma.schedule.findFirst({
    where: { id: scheduleId, userId },
    include: {
      activities: {
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { startDate: "desc" },
      },
    },
  });
};

export const getAllSchedulesByUser = async (userId: string) => {
  return await prisma.schedule.findMany({
    where: { userId },
  });
};

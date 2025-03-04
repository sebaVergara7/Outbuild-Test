import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

export const registerUser = async (email: string, password: string) => {
  return prisma.$transaction(async (prisma) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      throw new Error(`User with email ${email} already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error(`(${email}) Invalid credentials`);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error(`(${email}) Invalid credentials`);

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  return { token };
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  const { icon, title, userId, target } = body;

  try {
    return await addHabit(icon, title, userId, target);
  } catch (error) {
    console.error("Error in habit post handler:", error);

    if (error instanceof Error) {
      if (error.message.includes("Foreign key constraint failed")) {
        throw createError({
          statusCode: 400,
          message: "Invalid userId. The specified user does not exist.",
        });
      }
    }

    throw createError({
      statusCode: 500,
      message: "An unexpected error occurred while creating the habit.",
    });
  }
});

export const addHabit = async (
  icon: string,
  title: string,
  userId: string,
  target: number
) => {
  // Check if the user exists before creating the habit
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error("User not found");
  }

  return await prisma.habit.create({
    data: {
      icon,
      title,
      userId,
      weeklyTarget: target,
    },
  });
};

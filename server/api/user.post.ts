import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  const { name, email, username, id } = body;
  return await addUser(id, name, email, username);
});

export const addUser = async (
  id: string,
  name: string,
  email: string,
  username: string
) => {
  return await prisma.user.create({
    data: {
      id,
      name,
      email,
      username,
    },
  });
};

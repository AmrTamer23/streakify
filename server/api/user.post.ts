import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//@ts-ignore
export default defineEventHandler(async (e) => {
  // @ts-ignore
  const body = await readBody(e);
  const { name, email, username } = body;
  console.log({ body });
  return await addUser(name, email, username);
});

export const addUser = async (
  name: string,
  email: string,
  username: string
) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      username,
    },
  });
};

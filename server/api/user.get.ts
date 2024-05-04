import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//@ts-ignore
export default defineEventHandler(async (e) => {
  const id = e.path.split("?").pop();
  if (!id) {
    return new Response("Bad Request", { status: 400 });
  }
  const user = await getUser(id);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }
  return user;
});

const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

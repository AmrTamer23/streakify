import { useState } from "nuxt/app";

export const useUser = async (id?: string) => {
  // let user: User;
  // if (id) user = (await fetch(`/api/user?${id}`)).body as unknown as User;
  // return useState("user", () => user);
  const user = useState<User>("user");
  if (id) user.value = (await fetch(`/api/user?${id}`)).body as unknown as User;
  return user;
};

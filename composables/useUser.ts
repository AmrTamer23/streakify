import { useState } from "nuxt/app";

export const useUser = async () => {
  const { user } = useAuth();
  // let user: User;
  // if (id) user = (await fetch(`/api/user?${id}`)).body as unknown as User;
  // return useState("user", () => user);
  const userData = useState<User>("user");

  const { data, error, refresh } = await useAsyncData("userData", () =>
    $fetch(`/api/user?${user.value?.id}`)
      .then((data) => data as User)
      .then((data) => {
        userData.value = data;
      })
  );

  return {
    user: userData.value,
    refresh,
  };
};

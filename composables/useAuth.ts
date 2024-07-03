import { useState } from "nuxt/app";

export const useIsAuth = (id?: string) => {
  const isAuth = useState<boolean>("isAuth");
  isAuth.value = useSupabaseClient().auth.getUser() !== null;
  return {
    isAuth,
    login() {
      isAuth.value = true;
    },
    logout() {
      isAuth.value = false;
    },
  };
};

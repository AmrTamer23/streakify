import { ref, watch } from "vue";

export const useAuth = () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const isLoading = ref(true);

  watch(
    user,
    () => {
      isLoading.value = false;
    },
    { immediate: true }
  );

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    isLoading,
    signIn,
    signOut,
  };
};

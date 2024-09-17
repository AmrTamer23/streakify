import { ref, watch } from "vue";
import { useToast } from "@/components/ui/toast";

export const useAuth = () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const toast = useToast();
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
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return {
    user,
    isLoading,
    signIn,
    signOut,
  };
};

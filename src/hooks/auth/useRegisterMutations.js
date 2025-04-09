import { AuthRepository } from "@/repositories";
import { useMutation } from "@tanstack/react-query";

export const useAuthMutations = () => {
  const register = useMutation({
    mutationFn: async (data) => {
      const response = await AuthRepository.loginAdmin(data);
      return response;
    },
    onSuccess: (data) => {

    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
  return {
    register
  };
}
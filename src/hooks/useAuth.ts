// src/hooks/useAuth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { indexRoute, rootRoute } from "../routes";
import { supabase } from "../services/supabase";

export interface LoginProps {
  email: string;
  password: string;
}
export const useAuth = () => {
  const useUser = () => {
    return useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        return user;
      },
    });
  };

  const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ email, password }: LoginProps) =>
        supabase.auth.signInWithPassword({ email, password }),
      onSuccess: (data) => {
        queryClient.setQueryData(["user"], data.data.user);
        navigate(indexRoute);
      },
    });
  };

  const useRegister = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ email, password }: LoginProps) =>
        supabase.auth.signUp({ email, password }),
      onSuccess: (data) => {
        queryClient.setQueryData(["user"], data.data.user);
        navigate(indexRoute);
      },
    });
  };

  const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => supabase.auth.signOut(),
      onSuccess: () => {
        queryClient.setQueryData(["user"], null);
        navigate(rootRoute);
      },
    });
  };

  return {
    useUser,
    useLogin,
    useRegister,
    useLogout,
  };
};

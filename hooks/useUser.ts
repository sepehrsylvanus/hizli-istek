import { getMe } from "@/actions/authActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
export function useGetUser(token: string) {
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      const currentUser = await getMe(token);
      return currentUser;
    },
  });
}
export function useSetToken() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (token: string) => {
      await Cookies.set("token", token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
    },
  });
}

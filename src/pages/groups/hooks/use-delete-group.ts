import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase
        .from("groups")
        .delete()
        .eq("id", id)
        .select();

      if (error) throw error;

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

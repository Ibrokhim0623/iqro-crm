import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";
import type { IStudent } from "../models/student-model";

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation<IStudent, Error, number>({
    mutationFn: async (studentId: number) => {
      const { data, error } = await supabase
        .from("students")
        .delete()
        .eq("id", studentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

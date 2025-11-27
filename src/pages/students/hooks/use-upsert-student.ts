import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";
import type { IStudent } from "../models/student-model";
import { toast } from "sonner";

export function useUpsertStudent() {
  const queryClient = useQueryClient();

  return useMutation<IStudent, Error, Partial<IStudent> & { id?: number }>({
    mutationFn: async (student) => {
      if (student.id) {
        const { data, error } = await supabase
          .from("students")
          .update(student)
          .eq("id", student.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("students")
          .insert([student])
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyDebts"] });
      toast.success("Muvaffaqqiyatli");
    },
  });
}

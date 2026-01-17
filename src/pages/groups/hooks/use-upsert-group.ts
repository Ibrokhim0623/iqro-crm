import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";
import type { IGroup, IGroupInput, ITeacher } from "../models";
import { toast } from "sonner";

export function useUpsertGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IGroupInput): Promise<IGroup> => {
      const { id, ...rest } = payload;

      const insertData = {
        id: id ?? undefined,
        name: rest.name,
        price_cource: Number(rest.price_cource),
        teacher_id: rest.teacher_id,
        days: rest.days,
        start_time: rest.start_time,
        end_time: rest.end_time,
      };

      const { data, error } = await supabase
        .from("groups")
        .upsert(insertData)
        .select(
          `
          id,
          name,
          student_count,
          price_cource,
          teacher:teachers!groups_teacher_id_fkey (
            id,
            full_name
          ),
          start_time,
          end_time,
          days
        `
        )
        .single();

      if (error) throw error;
      if (!data) throw new Error("No group returned from upsert");

      const normalized: IGroup = {
        id: data.id,
        name: data.name,
        student_count: data.student_count,
        price_cource: data.price_cource,
        teacher: Array.isArray(data.teacher)
          ? data.teacher[0]
          : (data.teacher as ITeacher | null),
        start_time: data.start_time,
        end_time: data.end_time,
        days: data.days,
      };

      return normalized;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Muvaffaqqiyatli");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Xatolik yuz berdi");
    },
  });
}

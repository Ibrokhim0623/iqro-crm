import { supabase } from "@lib/supabase";
import { useQuery } from "@tanstack/react-query";
import type { IGroup } from "../models";

export function useGetGroups() {
  return useQuery<IGroup[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data, error } = await supabase.from("groups").select(`
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
      `);

      if (error) throw error;

      return (data ?? []) as IGroup[];
    },
    staleTime: 5 * 60 * 1000, // 5 daqiqa
  });
}

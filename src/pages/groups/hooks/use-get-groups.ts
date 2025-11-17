import { useQuery } from "@tanstack/react-query";
import type { IGroup } from "../models";
import { supabase } from "@lib/supabase";

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
    )
  `);

      if (error) throw error;
      return data as unknown as IGroup[];
    },
    staleTime: Infinity,
  });
}

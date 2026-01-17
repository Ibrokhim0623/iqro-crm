import { useQuery } from "@tanstack/react-query";
import type { IStudent, SupabaseStudent } from "../models";
import { supabase } from "@lib/supabase";

export function useGetStudents() {
  return useQuery<IStudent[]>({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase.from("students").select(`
          id,
          name,
          phone,
          status,
          balance,
          group:groups (
            id,
            name
          )
        `);

      if (error) throw error;

      return (data ?? []).map((student: SupabaseStudent) => {
        const group =
          Array.isArray(student.group) && student.group.length > 0
            ? student.group[0]
            : Array.isArray(student.group)
              ? null
              : student.group;

        return {
          id: student.id,
          name: student.name,
          phone: student.phone,
          status: student.status,
          balance: student.balance,
          group: group as IStudent["group"],
        };
      });
    },
    staleTime: 5 * 60 * 1000, // 5 daqiqa
  });
}

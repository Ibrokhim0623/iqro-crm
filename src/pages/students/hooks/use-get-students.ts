import { useQuery } from "@tanstack/react-query";
import type { IStudent } from "../models";
import { supabase } from "lib";

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
      return data as unknown as IStudent[];
    },
    staleTime: Infinity,
  });
}

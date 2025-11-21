import { supabase } from "@lib/supabase";
import { useQuery } from "@tanstack/react-query";

export interface ITeacher {
  id: number;
  full_name: string;
  phone: string;
  user_id?: string;
}

export const useGetTeachers = () => {
  return useQuery<ITeacher[]>({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .order("full_name", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};

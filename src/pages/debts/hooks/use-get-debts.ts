import { useQuery } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";
import type { IDebtData, SupabaseDebtRow } from "../models";

export function useGetMonthlyDebts() {
  return useQuery<IDebtData[], Error>({
    queryKey: ["monthlyDebts"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_monthly_debts");
      if (error) throw error;

      return (data || []).map((row: SupabaseDebtRow) => ({
        student: {
          student_id: row.student_id,
          name: row.student_name,
        },
        group: {
          id: row.group_id,
          name: row.group_name,
        },
        price_cource: row.price_cource,
        paid_this_month: row.paid_this_month,
        debt: row.debt,
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 daqiqa
  });
}

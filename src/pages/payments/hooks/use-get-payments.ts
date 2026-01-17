import { useQuery } from "@tanstack/react-query";
import type { IPayment, SupabasePayment } from "../models";
import { supabase } from "@lib/supabase";

export function useGetPayments() {
  return useQuery<IPayment[], Error>({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(
          `
          id,
          student_name,
          amount,
          payment_date,
          description,
          created_at
        `
        )
        .order("payment_date", { ascending: false });

      if (error) throw error;

      return (data || []).map((p: SupabasePayment) => ({
        id: p.id,
        student_name: p.student_name,
        amount: Number(p.amount),
        payment_date: p.payment_date,
        description: p.description,
        created_at: p.created_at,
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 daqiqa
    refetchOnWindowFocus: true,
  });
}

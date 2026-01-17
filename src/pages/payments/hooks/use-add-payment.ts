import { supabase } from "@lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: {
      student_id: number;
      amount: number;
      payment_date: string;
      description?: string;
    }) => {
      const { data, error } = await supabase
        .from("payments")
        .insert([values])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyDebts"] });
      toast.success("To'lovingiz qabul qilindi");
    },
    onError: (error: Error) => {
      toast.error(error.message || "To'lov qabul qilinmadi");
    },
  });
}

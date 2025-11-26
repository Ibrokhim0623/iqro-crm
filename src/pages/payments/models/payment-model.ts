export interface IPayment {
  id: string;
  student_name: string | null;
  amount: number;
  payment_date: string;
  description?: string;
  created_at: string;
}

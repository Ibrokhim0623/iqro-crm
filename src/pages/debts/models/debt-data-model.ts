export interface IDebtData {
  student: {
    student_id: number;
    name: string;
  };
  group: {
    id: number;
    name: string;
  };
  price_cource: number;
  paid_this_month: number;
  debt: number;
}

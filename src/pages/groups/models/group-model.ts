export interface IGroup {
  id: number;
  name: string;
  student_count: number;
  teacher: {
    id: number;
    full_name: string;
  };
  price_cource: number;
}

export interface ITeacher {
  id: number;
  full_name: string;
}

export interface IGroup {
  id: number;
  name: string;
  student_count: number;
  price_cource: number;
  teacher: ITeacher | null;
  start_time: string | null;
  end_time: string | null;
  days: number[];
}

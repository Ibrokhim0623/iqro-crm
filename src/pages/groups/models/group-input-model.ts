export interface IGroupInput {
  id?: number;
  name: string;
  price_cource: number | string;
  teacher_id: number;
  days: number[];
  start_time: string;
  end_time: string;
}

export interface IStudentCreate {
  name: string;
  phone?: string | null;
  group_id: number | null;
  status?: string | null;
  balance?: number | null;
}

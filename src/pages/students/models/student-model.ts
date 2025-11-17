export interface IStudent {
  id: number;
  name: string;
  phone: string | null;
  group: {
    id: number | null;
    name: string | null;
  } | null;
  status: string | null;
  balance: number | null;
}

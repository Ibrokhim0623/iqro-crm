export interface SupabaseStudent {
  id: number;
  name: string;
  phone: string | null;
  status: string | null;
  balance: number | null;
  group:
    | {
        id: number | null;
        name: string | null;
      }
    | {
        id: number | null;
        name: string | null;
      }[]
    | null;
}
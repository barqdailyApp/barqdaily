export interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  time_zone: string;
  order_by: number;
}

export interface Payment {
  id: string;
  type: string;
  logo: string;
  order_by: number;
  name: string;
  is_active: boolean;
  wallet_number: string | null;
}

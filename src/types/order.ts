export interface Order {
  order_id: string;
  order_number: string;
  total_price: string;
  products_price: string;
  delivery_type: string;
  estimated_delivery_time: string;
  delivery_day: string;
  promo_code_discount: any;
  delivery_fee: string;
  slot: any;
  address: Address;
  shipments: Shipments;
}

export interface Address {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
}

export interface Shipments {
  id: string;
  order_id: string;
  cancel_reason: CancelReason;
  canceled_by: string;
  driver: any;
  products: Product[];
  status: string;
  feedback: any;
}

export interface CancelReason {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name: string;
  name_ar: string;
  type: string;
  roles: string[];
}

export interface Product {
  product_id: string;
  product_category_price_id: string;
  product_name: string;
  product_logo: string;
  quantity: number;
  measurement_unit_name: string;
}

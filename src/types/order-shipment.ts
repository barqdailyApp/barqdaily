export interface SingleShipment {
  shipment_id: string;
  order_confirmed_at: string;
  order_on_processed_at: any;
  order_ready_for_pickup_at: any;
  order_shipped_at: any;
  order_delivered_at: any;
  order_canceled_at: any;
  canceled_by: any;
  status: string;
  driver: Driver;
  order: Order;
  shipment_feedback: any;
  shipment_products: ShipmentProduct[];
  warehouse: Warehouse;
}

export interface Driver {
  id: string;
  username: string;
  email: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface Order {
  id: string;
  number: string;
  total_price: string;
  estimated_delivery_time: string;
  products_price: string;
  note: string;
  is_paid: boolean;
  promo_code_discount: any;
  payment_method: string;
  delivery_type: string;
  delivery_day: string;
  delivery_fee: string;
  created_at: string;
  client: Client;
  address: Address;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}

export interface Address {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
}

export interface ShipmentProduct {
  id: string;
  shipment_id: string;
  product_id: string;
  can_return: boolean;
  product_name: string;
  product_logo: string;
  quantity: number;
  is_recoverd: boolean;
  price: string;
  total_price: number;
  measurement_unit_name: string;
}

export interface Warehouse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface FullOrder {
  order_id: string;
  created_at: string;
  estimated_delivery_time: string;
  delivery_fee: string;
  order_number: string;
  products_price: string;
  order_products: number;
  total_price: string;
  promo_code_discount: any;
  shipments: Shipments;
}

export interface Shipments {
  id: string;
  order_id: string;
  driver: Driver | null;
  status: string;
  order_confirmed_at: any;
  order_on_processed_at: any;
  order_shipped_at: any;
  order_delivered_at: any;
  order_canceled_at: string;
  canceled_by: string;
  shipment_feedback: any;
  shipment_products: ShipmentProduct[];
}

export interface Driver {
  id: string;
  username: string;
  phone: string;
  avatar: string;
  latitude: number;
  longitude: number;
}

export interface ShipmentProduct {
  id: string;
  shipment_id: string;
  product_id: string;
  can_return: boolean;
  product_category_price_id: string;
  quantity: number;
  warehouse_quantity: number;
  product_price: string;
  product_name: string;
  product_logo: string;
  total_price: number;
  row_number: any;
  min_order_quantity: number;
  max_order_quantity: number;
  product_measurement_id: string;
  measurement_unit_id: string;
  measurement_unit: string;
  cart_products: any;
}

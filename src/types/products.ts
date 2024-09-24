export interface Category {
  id: string;
  category_id: string;
  name: string;
  logo: string;
  order_by: boolean;
  is_active: boolean;
}

export interface SubCategory {
  id: string;
  sub_category_id: string;
  name: string;
  order_by: number;
  logo: string;
  is_active: boolean;
}

export interface Product {
  section_id: string;
  product_category_price_id: string;
  offer_id: string | null;
  offer_price: string | null;
  offer_quantity: number | null;
  offer_description_ar: string | null;
  offer_description_en: string | null;
  is_quantity_available: boolean;
  warehouse_quantity: number;
  product_id: string;
  product_name: string;
  product_name_en: string;
  product_logo: string;
  product_price_id: string;
  product_price: string;
  min_order_quantity: number;
  max_order_quantity: number;
  product_measurement_id: string;
  measurement_unit_id: string;
  measurement_unit: string;
  measurement_unit_en: string;
  cart_products: any | null;
}

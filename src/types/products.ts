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

export interface FullProduct {
  product: {
    section_id: string;
    product_id: string;
    product_name: string;
    product_description: string;
    product_is_fav: boolean;
    is_quantity_available: boolean;
    product_logo: string;
    product_images: string[];
  };
  product_measurements: ProductMeasurement[];
}
export interface ProductMeasurement {
  product_measurement_id: string;
  conversion_factor: string;
  is_main_unit: boolean;
  measurement_unit: string;
  warehouse_quantity: number;
  min_order_quantity: number;
  max_order_quantity: number;
  offer: any;
  product_category_price: ProductCategoryPrice;
  product_additional_services: ProductAdditionalService[];
  cart_products: any;
}

export interface ProductCategoryPrice {
  product_category_price_id: string;
  product_price: string;
}

export interface ProductAdditionalService {
  product_additional_service_id: string;
  price: string;
  additional_service: AdditionalService;
}

export interface AdditionalService {
  additional_service_id: string;
  name: string;
}

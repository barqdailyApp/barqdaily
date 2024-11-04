// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from "zustand";

export interface CartProduct {
  id: string;
  product_id: string;
  name: string;
  section_id: string;
  description: string;
  original_price: number;
  price: number;
  quantity: number;
  unit: string;
  unit_id: string;
  min_order_quantity: number;
  max_order_quantity: number;
  warehouse_quantity: number;
  offer_description: string;
  additional_services: any[];
  image: string;
}

interface CartState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  products: CartProduct[];
  productsQuantity: number;
  setProduct: (product: CartProduct) => void;
  removeProduct: (id: string) => void;
}

export const useCartStore = create<CartState>()((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  products: [],
  productsQuantity: 0,
  setProduct: (newProduct) =>
    set((state) => {
      let isProductExist = false;
      const updatedProducts = state.products.map((product) => {
        if (product.id === newProduct.id) {
          isProductExist = true;
          return newProduct;
        }
        return product;
      });

      return {
        ...(isProductExist
          ? { products: updatedProducts }
          : {
              products: [...updatedProducts, newProduct],
              productsQuantity: state.productsQuantity + 1,
            }),
      };
    }),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
      productsQuantity: state.productsQuantity - 1,
    })),
}));

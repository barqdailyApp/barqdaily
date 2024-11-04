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
  totalPrice: number;
  setProduct: (product: CartProduct) => void;
  removeProduct: (id: string) => void;
  initProducts: (products: CartProduct[]) => void;
  deliveryFee: number;
  setDeliveryFee: (fee: number) => void;
}

export const useCartStore = create<CartState>()((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  products: [],
  productsQuantity: 0,
  totalPrice: 0,
  setProduct: (newProduct) =>
    set((state) => {
      let isProductExist = false;
      let priceDiff = 0;

      const updatedProducts = state.products.map((product) => {
        if (product.id === newProduct.id) {
          isProductExist = true;
          priceDiff =
            newProduct.price * newProduct.quantity -
            product.price * product.quantity;
          return newProduct;
        }
        return product;
      });

      return {
        ...(isProductExist
          ? {
              products: updatedProducts,
              totalPrice: state.totalPrice + priceDiff,
            }
          : {
              products: [...updatedProducts, newProduct],
              productsQuantity: state.productsQuantity + 1,
              totalPrice:
                state.totalPrice + newProduct.price * newProduct.quantity,
            }),
      };
    }),
  removeProduct: (id) =>
    set((state) => {
      const oldProduct = state.products.find(
        (product) => product.id === id
      ) || { price: 0, quantity: 0 };

      return {
        products: state.products.filter((product) => product.id !== id),
        productsQuantity: state.productsQuantity - 1,
        totalPrice: state.totalPrice - oldProduct.price * oldProduct.quantity,
      };
    }),
  initProducts: (products) =>
    set({
      products,
      productsQuantity: products.length,
      totalPrice: products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
    }),
  deliveryFee: 0,
  setDeliveryFee: (fee) => set({ deliveryFee: fee }),
}));

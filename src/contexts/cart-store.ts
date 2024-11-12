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

export interface PromoCode {
  id: string;
  code: string;
  discount: number;
}

interface InitialState {
  loading: boolean;
  promocode: PromoCode | null;
  products: CartProduct[];
  productsQuantity: number;
  totalPrice: number;
  deliveryFee: number;
}

interface CartStateActions {
  initCart: VoidFunction;
  setLoading: (loading: boolean) => void;
  setPromocode: (promocode: PromoCode | null) => void;
  setProduct: (product: CartProduct) => void;
  removeProduct: (id: string) => void;
  initProducts: (products: CartProduct[]) => void;
  setDeliveryFee: (fee: number) => void;
}

const initialState: InitialState = {
  loading: false,

  promocode: null,

  products: [],
  productsQuantity: 0,
  totalPrice: 0,

  deliveryFee: 0,
};

export const useCartStore = create<InitialState & CartStateActions>()(
  (set) => ({
    ...initialState,
    initCart: () => set({ ...initialState }),
    setLoading: (loading) => set({ loading }),
    setPromocode: (promocode) => set({ promocode }),
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
    setDeliveryFee: (fee) => set({ deliveryFee: fee }),
  })
);

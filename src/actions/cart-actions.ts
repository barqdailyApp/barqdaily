"use server";

import { endpoints } from "@/utils/endpoints";
import {
  getData,
  postData,
  editData,
  deleteData,
} from "@/utils/crud-fetch-api";

import { PromoCode, CartProduct } from "@/contexts/cart-store";

import { Payment, TimeSlot } from "@/types/cart";

export async function fetchCartProducts() {
  const res = await getData<CartProduct[]>(endpoints.cart.fetchProducts);

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export async function addProductToCart(product_category_price_id: string) {
  const res = await postData<
    CartProduct,
    { product_category_price_id: string }
  >(`${endpoints.cart.add}`, { product_category_price_id });

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export async function removeCartProduct(cart_product_id: string) {
  const res = await deleteData<any>(endpoints.cart.delete(cart_product_id));

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export async function updateCartProduct(cart_product_id: string, add: boolean) {
  const res = await editData<
    CartProduct,
    {
      cart_product_id: string;
      add: boolean;
    }
  >(endpoints.cart.update, "PUT", { cart_product_id, add });

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export async function fetchTimeSlots(delivery_day: string) {
  const res = await getData<TimeSlot[]>(endpoints.cart.timeSlots(delivery_day));

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export async function fetchPayments() {
  const res = await getData<Payment[]>(endpoints.cart.listPayments);

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export interface CreateOrderBody {
  section_id: string;
  promo_code?: string;
  note: string;
  payment_method: {
    payment_method_id: string;
    transaction_number?: string;
    wallet_number: null;
  };
  delivery_type: string;
  slot_day: {
    slot_id: string;
    day: string;
  };
}
export async function createOrder(body: CreateOrderBody) {
  const res = await postData<any, CreateOrderBody & { platform: "WEB" }>(
    `${endpoints.cart.createOrder}`,
    { ...body, platform: "WEB" }
  );

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export async function fetchPromoCode(code: string, paymentMethodId: string) {
  const res = await getData<PromoCode>(
    endpoints.cart.fetchPromoCode(code, paymentMethodId)
  );

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

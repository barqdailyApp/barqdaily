"use server";

import { endpoints } from "@/utils/endpoints";
import {
  getData,
  postData,
  editData,
  deleteData,
} from "@/utils/crud-fetch-api";

import { CartProduct } from "@/contexts/cart-store";
import { TimeSlot } from "@/types/cart";

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

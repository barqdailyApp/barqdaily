import { cookies } from "next/headers";

import axiosInstance from "@/utils/axios";
import { endpoints } from "@/utils/endpoints";

import { Order } from "@/types/order";

export async function fetchOrders(): Promise<
  { items: Order[]; total: number } | { error: string }
> {
  try {
    const token = cookies().get("session");
    const res = await axiosInstance.get(endpoints.orders, {
      params: { page: 1, limit: 10 },
      headers: { Authorization: `Bearer ${token?.value}` },
    });

    return {
      items: res?.data?.data?.data,
      total: res?.data?.data?.meta.itemCount,
    };
  } catch (err: any) {
    return { error: err?.message };
  }
}

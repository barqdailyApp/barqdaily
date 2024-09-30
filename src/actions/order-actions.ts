import { Order } from "@/types/order";
import axiosInstance from "@/utils/axios";
import { endpoints } from "@/utils/endpoints";
import { cookies } from "next/headers";

export async function fetchOrders(): Promise<
  { items: Order[]; total: number } | { error: string }
> {
  try {
    const token = cookies().get("session");
    const res = await axiosInstance.get(endpoints.orders, {
      params: { page: 1, limit: 10 },
      headers: { Authorization: `Bearer ${token?.value}` },
    });
    const {
      data,
      meta: { itemCount },
    } = res?.data?.data;
    return { items: data, total: itemCount };
  } catch (err: any) {
    return { error: err?.message };
  }
}

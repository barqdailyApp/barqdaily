import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import OrderView from "@/sections/order/view/order-view";

import { Order } from "@/types/order";

type Response = { data: Order[]; meta: { itemCount: number } };

export default async function Page() {
  const searchParams = new URLSearchParams({
    page: "1",
    limit: "10",
  });
  const orders = await getData<Response>(
    `${endpoints.orders}?${searchParams.toString()}`
  );
  if ("error" in orders) {
    throw new Error(orders.error);
  }
  return <OrderView orders={orders.data.data} />;
}

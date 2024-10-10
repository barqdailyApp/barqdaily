import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import { OrderDetails } from "@/sections/order/order-details-view";

import { FullOrder } from "@/types/order-details";

export default async function Page({
  params,
}: {
  params: { order_id: string };
}) {
  const order = await getData<FullOrder>(
    endpoints.singleOrder(params.order_id)
  );
  if ("error" in order) {
    throw new Error(order.error);
  }
  return <OrderDetails orderdetails={order.data} />;
}

import { OrderDetails } from "@/sections/order/order-details-view";
import { FullOrder } from "@/types/order-details";
import { getData } from "@/utils/crud-fetch-api";
import { endpoints } from "@/utils/endpoints";
import { error } from "console";

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

import { fetchOrders } from "@/actions/order-actions";

import OrderView from "@/sections/order/view/order-view";

export default async function Page() {
  const orders = await fetchOrders();
  if ("error" in orders) {
    throw new Error(orders.error);
  }
  return <OrderView orders={orders.items} />;
}

import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import OrderAgain from "@/sections/home/order-again";

export default async function OrderAgainView() {
  const orders = await getData<{ data: any[] }>(
    `${endpoints.orders.list}?page=1&limit=6&status=DELIVERED`
  );

  console.log("orders", orders);
  const items = "error" in orders ? [] : orders.data?.data;


  return <OrderAgain orders={items} />;
}

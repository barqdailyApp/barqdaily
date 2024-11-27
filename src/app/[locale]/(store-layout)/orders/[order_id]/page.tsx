import { getTranslations } from "next-intl/server";

import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import { LocaleType } from "@/i18n/config-locale";

import SingleOrderView from "@/sections/order/view/single-order-view";

import { FullOrder } from "@/types/order-details";
import { SingleShipment } from "@/types/order-shipment";

export default async function Page({
  params,
}: {
  params: { order_id: string };
}) {
  const order = await getData<FullOrder>(
    endpoints.orders.single(params.order_id)
  );
  if ("error" in order) {
    throw new Error(order.error);
  }

  const shipment = await getData<SingleShipment>(
    endpoints.orders.shipment(order.data.shipments.id)
  );
  if ("error" in shipment) {
    throw new Error(shipment.error);
  }

  return <SingleOrderView order={order.data} shipment={shipment.data} />;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LocaleType };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("Title.orders"),
  };
}

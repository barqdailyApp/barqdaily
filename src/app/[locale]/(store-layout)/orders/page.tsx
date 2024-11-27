import { getTranslations } from "next-intl/server";

import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import { LocaleType } from "@/i18n/config-locale";

import OrderView from "@/sections/order/view/order-view";

import { Order } from "@/types/order";

type Response = { data: Order[]; meta: { itemCount: number } };

interface Props {
  searchParams: { status: string | undefined; page: string | undefined };
}

export default async function Page({ searchParams: { status, page } }: Props) {
  const queries = new URLSearchParams({
    page: page || "1",
    limit: "5",
    ...(status ? { status } : {}),
  });
  const orders = await getData<Response>(
    `${endpoints.orders.list}?${queries.toString()}`
  );
  if ("error" in orders) {
    throw new Error(orders.error);
  }
  return (
    <OrderView
      orders={orders.data.data}
      pagesCount={Math.ceil(orders.data.meta.itemCount / 5)}
    />
  );
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

import { getTranslations } from "next-intl/server";

import { Alert } from "@mui/material";

import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import { LocaleType } from "@/i18n/config-locale";
import { fetchProductsByBrand } from "@/actions/products-actions";

import ProductsListView from "@/sections/products/view/products-list-view";

import { Brand } from "@/types/products";

interface Props {
  params: {
    brand_id: string;
  };
  searchParams: Record<"page", string | undefined>;
}
export default async function Page({
  params: { brand_id },
  searchParams: { page },
}: Props) {
  const t = await getTranslations();

  const products = await fetchProductsByBrand(brand_id, Number(page || "1"));

  if ("error" in products) {
    return <Alert severity="error">{products.error}</Alert>;
  }

  if (products.pagesCount === 0) {
    return (
      <Alert severity="warning">{t("Global.Error.no_products_found")}</Alert>
    );
  }

  return (
    <ProductsListView
      products={products.items}
      pagesCount={products.pagesCount}
    />
  );
}

export async function generateMetadata({
  params: { locale, brand_id },
}: {
  params: { locale: LocaleType; brand_id: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const res = await getData<Brand[]>(
    `${endpoints.products.brands}?${new URLSearchParams({
      filters: `id=${brand_id}`,
    })}`,
    {
      headers: {
        "Accept-Language": locale,
      },
    }
  );

  if ("error" in res || res.data.length === 0) {
    return {
      title: t("Title.products"),
    };
  }
  return {
    title: `${res.data[0].name} | ${t("Title.default")}`,
  };
}

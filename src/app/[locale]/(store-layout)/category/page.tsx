import { getTranslations } from "next-intl/server";

import { Alert } from "@mui/material";

import { LocaleType } from "@/i18n/config-locale";
import { fetchProductsBySubCategory } from "@/actions/products-actions";

import ProductsListView from "@/sections/products/view/products-list-view";
import ProductsListLoading from "@/sections/products/loading/products-list-loading";

interface Props {
  searchParams: Record<
    "subCategoryId" | "page" | "lat" | "lng",
    string | undefined
  >;
}

export default async function Page({
  searchParams: { subCategoryId, page, lat, lng },
}: Props) {
  const t = await getTranslations();
  const latitude = lat ?? "0.0";
  const longitude = lng ?? "0.0";
  if (!subCategoryId) {
    return <ProductsListLoading />;
  }

  const products = await fetchProductsBySubCategory(
    subCategoryId,
    longitude,
    latitude,
    Number(page || "1")
  );

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
  params: { locale },
}: {
  params: { locale: LocaleType };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("Title.products"),
  };
}

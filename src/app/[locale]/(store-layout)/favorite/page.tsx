import { getTranslations } from "next-intl/server";

import { Alert } from "@mui/material";

import { LocaleType } from "@/i18n/config-locale";
import { fetchFavoriteProducts } from "@/actions/products-actions";

import ProductsListView from "@/sections/products/view/products-list-view";

interface Props {
  searchParams: Record<"page", string | undefined>;
}
export default async function Page({ searchParams: { page } }: Props) {
  const products = await fetchFavoriteProducts(Number(page || "1"));

  if ("error" in products) {
    return <Alert severity="error">{products.error}</Alert>;
  }

  if (products.pagesCount === 0) {
    return <Alert severity="warning">No products found</Alert>;
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
    title: t("Title.favorites"),
  };
}

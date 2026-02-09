import { getTranslations } from "next-intl/server";

import { Alert } from "@mui/material";

import { fetchProductsByCollection } from "@/actions/products-actions";

import ProductsListView from "@/sections/products/view/products-list-view";

interface Props {
  params: {
    collection_id: string;
  };
  searchParams: Record<"page", string | undefined>;
}

export default async function Page({
  params: { collection_id },
  searchParams: { page },
}: Props) {
  const t = await getTranslations();

  const products = await fetchProductsByCollection(
    collection_id,
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


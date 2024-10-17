import { Alert } from "@mui/material";

import TAlert from "@/CustomSharedComponents/t-alert";
import { fetchProductsBySubCategory } from "@/actions/products-actions";

import ProductsListView from "@/sections/products/view/products-list-view";
import ProductsListLoading from "@/sections/products/loading/products-list-loading";

interface Props {
  searchParams: Record<"subCategoryId" | "page", string | undefined>;
}

export default async function Page({
  searchParams: { subCategoryId, page },
}: Props) {
  if (!subCategoryId) {
    return <ProductsListLoading />;
  }

  const products = await fetchProductsBySubCategory(
    subCategoryId,
    Number(page || "1")
  );

  if ("error" in products) {
    return <Alert severity="error">{products.error}</Alert>;
  }

  if (products.pagesCount === 0) {
    return <TAlert severity="warning">Global.Error.no_products_found</TAlert>;
  }

  return (
    <ProductsListView
      products={products.items}
      pagesCount={products.pagesCount}
    />
  );
}

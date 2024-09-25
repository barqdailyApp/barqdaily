import { Alert } from "@mui/material";

import { fetchProductsBySubCategory } from "@/actions/products-actions";

import ProductsView from "@/sections/products/products-view";

interface Props {
  searchParams: { subCategoryId: string | undefined };
}

export default async function Page({ searchParams: { subCategoryId } }: Props) {
  if (!subCategoryId) {
    return "loading...";
  }

  const products = await fetchProductsBySubCategory(subCategoryId);

  if ("error" in products) {
    return <Alert severity="error">{products.error}</Alert>;
  }

  if (products.total === 0) {
    return <Alert severity="warning">No products found</Alert>;
  }

  return <ProductsView products={products.items} />;
}

import { Grid, Alert, Skeleton } from "@mui/material";

import TAlert from "@/CustomSharedComponents/t-alert";
import { fetchProductsBySubCategory } from "@/actions/products-actions";

import ProductsListView from "@/sections/products/view/products-list-view";

interface Props {
  searchParams: Record<"subCategoryId" | "page", string | undefined>;
}

export default async function Page({
  searchParams: { subCategoryId, page },
}: Props) {
  if (!subCategoryId) {
    return (
      <Grid container spacing={3}>
        {[...Array(10)].map((_, index) => (
          <Grid item xs={6} md={4} lg={3} key={index}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
        ))}
      </Grid>
    );
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

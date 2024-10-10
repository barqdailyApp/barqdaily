"use client";

import { Box, Grid } from "@mui/material";

import { paths } from "@/routes/paths";

import ParamsPagination from "@/CustomSharedComponents/params-pagination";
import { ProductCard } from "@/CustomSharedComponents/product/product-card";

import { Product } from "@/types/products";

interface Props {
  products: Product[];
  pagesCount: number;
}

export default function ProductsListView({ products, pagesCount }: Props) {
  return (
    <Box>
      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            key={item.product_id}
            sx={{ display: "grid", alignItems: "stretch" }}
          >
            <ProductCard
              product={item}
              href={`${paths.products}/${item.product_id}`}
            />
          </Grid>
        ))}
      </Grid>

      {pagesCount > 1 && <ParamsPagination pagesCount={pagesCount} />}
    </Box>
  );
}

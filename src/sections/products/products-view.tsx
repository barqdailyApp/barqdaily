"use client";

import { Grid } from "@mui/material";

import { paths } from "@/routes/paths";

import { ProductCard } from "@/CustomSharedComponents/product/product-card";

import { Product } from "@/types/products";

interface Props {
  products: Product[];
}

export default function ProductsView({ products }: Props) {
  return (
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
  );
}

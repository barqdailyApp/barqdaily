"use client";

import { Box, Grid } from "@mui/material";

import { paths } from "@/routes/paths";

import { SECTION_PADDING } from "@/layouts/config-layout";
import ParamsPagination from "@/CustomSharedComponents/params-pagination";

import { Offer, Product } from "@/types/products";

import { ProductCard } from "../product-card";

interface Props {
  products: (Product | Offer)[];
  pagesCount: number;
}

export default function ProductsListView({ products, pagesCount }: Props) {
  return (
    <Box pb={SECTION_PADDING}>
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

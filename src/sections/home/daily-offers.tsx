"use client";

import { Box, Grid, Container } from "@mui/material";

import { paths } from "@/routes/paths";

import { SECTION_PADDING } from "@/layouts/config-layout";

import { ProductCard } from "@/sections/products/product-card";

import { Offer } from "@/types/products";

import SectionHeadding from "./components/section-headding";

export default function DailyOffers({ offers }: { offers: Offer[] }) {
  const renderOffers = (
    <Grid
      container
      spacing={3}
      pt={{ xs: 3, sm: 6 }}
      sx={{
        "& .MuiGrid-item:nth-of-type(4)": {
          display: { md: "none", lg: "block" },
        },
      }}
    >
      {offers.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.product_id}>
          <ProductCard
            product={item}
            href={`${paths.products}/${item.product_id}`}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box bgcolor="background.neutral" py={SECTION_PADDING}>
      <Container>
        <SectionHeadding titleName="offers_title" href={paths.offers} />
        {renderOffers}
      </Container>
    </Box>
  );
}

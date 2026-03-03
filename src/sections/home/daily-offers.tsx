"use client";

import { useTranslations } from "next-intl";

import { Box, Grid, Container } from "@mui/material";

import { paths } from "@/routes/paths";

import { SECTION_PADDING } from "@/layouts/config-layout";

import { ProductCard } from "@/sections/products/product-card";

import { Offer } from "@/types/products";

import SectionHeadding from "./components/section-headding";

export default function DailyOffers({ offers }: { offers: Offer[] }) {
  const t = useTranslations("Pages.Home");

  const renderOffers = (
    <Grid container spacing={3} pt={{ xs: 3, sm: 6 }}>
      {offers.map((item, index) => (
        <Grid
          item
          xs={12 / 2}
          sm={12 / 3}
          md={12 / 4}
          lg={12 / 5}
          xl={12 / 7}
          key={item.product_id}
          sx={{
            display: {
              xs: index >= 4 ? "none" : "block",
              sm: index >= 6 ? "none" : "block",
              md: index >= 8 ? "none" : "block",
              lg: index >= 5 ? "none" : "block",
              xl: index >= 7 ? "none" : "block",
            },
          }}
        >
          <ProductCard
            product={item}
            href={`${paths.products}/${item.product_id}`}
            sx={{ minHeight: "100%" }}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box py={SECTION_PADDING}>
      <Container>
        <SectionHeadding titleName={t("offers_title")} href={paths.offers} />
        {renderOffers}
      </Container>
    </Box>
  );
}

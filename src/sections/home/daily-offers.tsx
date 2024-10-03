"use client";

import { useTranslations } from "next-intl";

import { Box, Link, Stack, Container, Typography, Grid } from "@mui/material";

import { paths } from "@/routes/paths";
import { useDir } from "@/routes/hooks/use-dir";
import { RouterLink } from "@/routes/components";

import Iconify from "@/components/iconify";

import { Offer } from "@/types/products";
import { ProductCard } from "@/CustomSharedComponents/product/product-card";

export default function DailyOffers({ offers }: { offers: Offer[] }) {
  const t = useTranslations("Pages.Home");
  const dir = useDir();

  const renderHeadding = (
    <Stack direction="row" spacing={3} justifyContent="space-between">
      <Typography variant="h4">{t("offers_title")}</Typography>
      <Link
        href={paths.offers}
        variant="h6"
        sx={{ display: "flex", alignItems: "center", gap: 0.25 }}
        component={RouterLink}
      >
        {t("offers_action")}{" "}
        <Iconify
          icon="weui:arrow-filled"
          sx={{ transform: dir === "rtl" ? " scaleX(-1)" : "" }}
          width={24}
        />
      </Link>
    </Stack>
  );

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
            href={`${paths.offers}/${item.product_id}`}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box bgcolor="background.neutral" py={{ xs: 4, sm: 6 }}>
      <Container>
        {renderHeadding}
        {renderOffers}
      </Container>
    </Box>
  );
}

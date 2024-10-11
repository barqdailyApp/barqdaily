"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Box, Stack, Button, Container, Typography } from "@mui/material";

import { useCurrency } from "@/utils/format-number";

import { SECTION_PADDING } from "@/layouts/config-layout";

import Iconify from "@/components/iconify";

import IncrementerButton from "@/sections/products/incrementer-button";

import { FullProduct, ProductMeasurement } from "@/types/products";

import ProductSwiper from "../product-swiper";

interface Props {
  product: FullProduct;
}

export default function SingleProductView({
  product: { product, product_measurements },
}: Props) {
  const currency = useCurrency();
  const t = useTranslations("");
  const [quantity, setQuantity] = useState(0);

  const measurement =
    product_measurements.find((item) => item.is_main_unit) ||
    ({} as ProductMeasurement);
  const offerPrice = measurement.offer?.offer_price;
  const originalPrice = measurement.product_category_price.product_price;
  const finalPrice = offerPrice ?? originalPrice;

  const maxQuantity = Math.min(
    measurement.warehouse_quantity,
    measurement.offer?.quantity ?? measurement.max_order_quantity
  );

  const renderSwiper = <ProductSwiper images={product.product_images} />;

  const renderContent = (
    <Box sx={{ height: "auto", pt: 4 }}>
      <Typography variant="h4" component="p">
        {product.product_name}
      </Typography>
      <Typography variant="h6">{measurement.measurement_unit}</Typography>
      <Typography
        variant="h5"
        color="primary"
        gutterBottom
        component="p"
        suppressHydrationWarning
      >
        {offerPrice && (
          <Typography component="del" color="text.disabled">
            {currency(originalPrice, false)}
          </Typography>
        )}{" "}
        {currency(finalPrice)}
      </Typography>
      <Typography fontWeight={700} component="p">
        {t("Pages.Home.Product.description")}
      </Typography>
      <Typography color="text.disabled">
        {product.product_description}
      </Typography>
    </Box>
  );

  const renderActions = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="start"
      spacing={1}
      pt={1}
    >
      <Button variant="outlined">
        <Iconify icon="ph:heart-bold" width={24} />
      </Button>

      {quantity === 0 ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="bxs:cart-alt" />}
          onClick={() => setQuantity(measurement.min_order_quantity)}
        >
          {t("Pages.Home.Product.add_to_cart")}
        </Button>
      ) : (
        <IncrementerButton
          onIncrease={() => setQuantity((prev) => prev + 1)}
          onDecrease={() =>
            setQuantity((prev) =>
              prev > measurement.min_order_quantity ? prev - 1 : 0
            )
          }
          quantity={quantity}
          disabledIncrease={quantity >= maxQuantity}
          min={measurement.min_order_quantity}
        />
      )}
    </Stack>
  );

  return (
    <Container sx={{ py: SECTION_PADDING }}>
      <Stack direction={{ md: "row" }} spacing={4}>
        <Box flexShrink={0} maxWidth={{ md: "50%" }}>
          {renderSwiper}
        </Box>

        <Box flexGrow={1}>
          {renderContent}

          {renderActions}
        </Box>
      </Stack>
    </Container>
  );
}

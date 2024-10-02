"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Box, Stack, Button, Container, Typography } from "@mui/material";

import IncrementerButton from "@/CustomSharedComponents/product/incrementer-button";

import Iconify from "@/components/iconify";

import { FullProduct, ProductMeasurement } from "@/types/products";

import ProductSwiper from "../product-swiper";

interface Props {
  product: FullProduct;
}

export default function SingleProductView({
  product: { product, product_measurements },
}: Props) {
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

  const renderSwiper = (
    <ProductSwiper
      images={[
        ...product.product_images,
        ...product.product_images,
        ...product.product_images,
      ]}
    />
  );

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
          <Typography
            component="del"
            color="text.disabled"
          >{`${originalPrice} `}</Typography>
        )}
        {`${finalPrice} ${t("Global.currency")}`}
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
    <Stack direction="row" alignItems="center" spacing={1} pt={1}>
      <Button variant="outlined">
        <Iconify icon="ph:heart-bold" width={24} />
      </Button>

      {quantity === 0 ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="bxs:cart-alt" />}
          onClick={() => setQuantity(measurement.min_order_quantity)}
          sx={{ flexGrow: 1 }}
        >
          {t("Pages.Home.Product.add_to_cart")}
        </Button>
      ) : (
        <Box>
          <IncrementerButton
            onIncrease={() => setQuantity((prev) => prev + 1)}
            onDecrease={() =>
              setQuantity((prev) =>
                prev > measurement.min_order_quantity ? prev - 1 : 0
              )
            }
            sx={{ flexGrow: 1, position: "relative" }}
            quantity={quantity}
            disabledIncrease={quantity >= maxQuantity}
            min={measurement.min_order_quantity}
          />
        </Box>
      )}
    </Stack>
  );

  return (
    <Container>
      <Stack direction={{ md: "row" }} spacing={4}>
        <Box flexShrink={0}>{renderSwiper}</Box>

        <Box flexGrow={1}>
          {renderContent}

          {renderActions}
        </Box>
      </Stack>
    </Container>
  );
}

"use client";

import { Box, Stack, Container, Typography } from "@mui/material";

import { useCurrency } from "@/utils/format-number";

import { SECTION_PADDING } from "@/layouts/config-layout";

import IncrementerButton from "@/sections/products/incrementer-button";

import { FullProduct, ProductMeasurement } from "@/types/products";

import ProductFavButton from "../fav-button";
import ProductSwiper from "../product-swiper";

interface Props {
  product: FullProduct;
}

export default function SingleProductView({
  product: { product, product_measurements },
}: Props) {
  const currency = useCurrency();

  const measurement =
    product_measurements.find((item) => item.is_main_unit) ||
    ({} as ProductMeasurement);
  const offerPrice = measurement.offer?.offer_price;
  const originalPrice = measurement.product_category_price.product_price;
  const finalPrice = offerPrice ?? originalPrice;

  const maxQuantity = Math.min(
    measurement.warehouse_quantity,
    measurement.max_order_quantity,
    ...(measurement.offer?.quantity ? [measurement.offer?.quantity] : [])
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
      <ProductFavButton
        isFav={product.product_is_fav}
        productId={product.product_id}
        sectionId={product.section_id}
        sx={{ alignSelf: "stretch" }}
      />

      <IncrementerButton
        product_id={product.product_id}
        product_price_id={
          measurement.product_category_price.product_category_price_id
        }
        min_order_quantity={measurement.min_order_quantity}
        max_order_quantity={maxQuantity}
      />
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

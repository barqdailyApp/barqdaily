import Image from "next/image";
import { useTranslations } from "next-intl";

import { Box, Stack, Typography } from "@mui/material";

import { useCurrency } from "@/utils/format-number";

import { CartProduct } from "@/contexts/cart-store";

import IncrementerButton from "../products/incrementer-button";

export default function CartItem({ product }: { product: CartProduct }) {
  const t = useTranslations("Pages.Orders.Single.Shipment");
  const currency = useCurrency();

  const maxQuantity = Math.min(
    product.warehouse_quantity,
    product.max_order_quantity
  );

  const renderTopRow = (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Image
        src={product.image}
        alt={product.name}
        width={60}
        height={60}
        style={{
          borderRadius: "50px",
          objectFit: "cover",
        }}
      />

      <Box>
        <Typography
          variant="body1"
          fontWeight="700"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="subtitle2" fontWeight="400" mt={1}>
          <Typography
            variant="body2"
            fontWeight="bold"
            component="span"
            color="primary"
          >
            {`${currency(product.price)} / `}
          </Typography>
          {product.unit}
        </Typography>
      </Box>
    </Stack>
  );

  const renderBottomRow = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mt: 1 }}
    >
      <Typography variant="subtitle2">
        {`${t("total")} : `}
        <Typography variant="inherit" fontWeight="700" component="span">
          {currency(product.price * product.quantity)}
        </Typography>
      </Typography>

      <IncrementerButton
        product_id={product.product_id}
        min_order_quantity={product.min_order_quantity}
        max_order_quantity={maxQuantity}
        sx={{ flexShrink: 0, width: "fit-content" }}
        is_quantity_available
      />
    </Stack>
  );

  return (
    <Box px={2}>
      <Stack spacing={1} justifyContent="flex-start">
        {renderTopRow}
        {renderBottomRow}
      </Stack>
    </Box>
  );
}

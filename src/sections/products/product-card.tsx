"use client";

import Link from "next/link";

import {
  Box,
  Card,
  Stack,
  styled,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";

import { useCurrency } from "@/utils/format-number";

import { useCartStore } from "@/contexts/cart-store";

import { Offer, Product } from "@/types/products";

import IncrementerButton from "./incrementer-button";

interface Props {
  product: Product | Offer;
  href: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  "&.selected": { boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}` },
  "&:hover": {
    boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}, 0px 0px 0px 4px ${theme.palette.primary.main}`,
    "&:has(.card-clickable-layer:active)": {
      boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`,
    },
    zIndex: 9,
  },
}));

export function ProductCard({ product, href }: Props) {
  const products = useCartStore((state) => state.products);
  const isProductInCart = !!products.find(
    (item) => item.product_id === product.product_id
  );

  const offerPrice = product.offer_price;
  const originalPrice = product.product_price;
  const finalPrice = offerPrice ?? originalPrice;

  const maxQuantity = Math.min(
    product.warehouse_quantity,
    product.max_order_quantity,
    ...(product.offer_quantity ? [product.offer_quantity] : [])
  );

  const currency = useCurrency();

  return (
    <StyledCard className={isProductInCart ? "selected" : ""}>
      <Box
        className="card-clickable-layer"
        aria-hidden
        sx={{ position: "absolute", inset: 0, cursor: "pointer" }}
        href={href}
        scroll={false}
        component={Link}
      />

      <CardMedia
        src={product.product_logo}
        alt={product.product_name}
        height={180}
        sx={{
          height: { xs: "140px", sm: "250px" },
          objectFit: "cover",
          cursor: "pointer",
        }}
        component="img"
      />
      <CardContent spacing={1} flexGrow={1} component={Stack}>
        <Typography variant="h6" component="p">
          {product.product_name}
        </Typography>
        <Typography variant="caption">{product.measurement_unit}</Typography>
        <Box flexGrow={1} aria-hidden />
        <Typography fontWeight={600} color="primary" suppressHydrationWarning>
          {offerPrice && (
            <Typography component="del" color="text.disabled">
              {currency(originalPrice, false)}
            </Typography>
          )}{" "}
          {currency(finalPrice)}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <IncrementerButton
            product_id={product.product_id}
            product_price_id={product.product_price_id}
            min_order_quantity={product.min_order_quantity}
            max_order_quantity={maxQuantity}
            addButtonProps={{
              sx: { flexGrow: 1 },
            }}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

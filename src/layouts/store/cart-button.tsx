"use client";

import { Badge, IconButton } from "@mui/material";

import { useCartStore } from "@/contexts/cart-store";

import Iconify from "@/components/iconify";

export default function CartButton() {
  const quantity = useCartStore((state) => state.productsQuantity);

  return (
    <IconButton>
      <Badge badgeContent={quantity} color="warning">
        <Iconify icon="bxs:cart-alt" />
      </Badge>
    </IconButton>
  );
}

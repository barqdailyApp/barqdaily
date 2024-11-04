"use client";

import Link from "next/link";

import { Badge, IconButton } from "@mui/material";

import { paths } from "@/routes/paths";

import { useCartStore } from "@/contexts/cart-store";

import Iconify from "@/components/iconify";

export default function CartButton() {
  const quantity = useCartStore((state) => state.productsQuantity);

  return (
    <IconButton LinkComponent={Link} href={paths.cart}>
      <Badge badgeContent={quantity} color="warning">
        <Iconify icon="bxs:cart-alt" />
      </Badge>
    </IconButton>
  );
}

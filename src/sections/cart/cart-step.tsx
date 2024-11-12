"use client";

import { Fragment } from "react";

import { Stack, Divider } from "@mui/material";

import { useCartStore } from "@/contexts/cart-store";

import CartItem from "./cart-item";

export default function CartStep() {
  const products = useCartStore((state) => state.products);

  return (
    <Stack spacing={2} alignItems="stretch" width="100%">
      {products.map((item, index) => (
        <Fragment key={index}>
          {index !== 0 ? <Divider flexItem /> : null}

          <CartItem product={item} />
        </Fragment>
      ))}
    </Stack>
  );
}

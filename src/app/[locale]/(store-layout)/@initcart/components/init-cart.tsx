"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";

import { useCartStore } from "@/contexts/cart-store";
import { fetchCartProducts } from "@/actions/cart-actions";

export default function InitCart() {
  const { enqueueSnackbar } = useSnackbar();
  const initProducts = useCartStore((state) => state.initProducts);

  useEffect(() => {
    (async () => {
      const res = await fetchCartProducts();

      if ("error" in res) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        console.log(res);
        initProducts(res);
      }
    })();
  }, [enqueueSnackbar, initProducts]);

  return null;
}

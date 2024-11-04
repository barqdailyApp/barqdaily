"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";

import { useCartStore } from "@/contexts/cart-store";
import { fetchCartProducts } from "@/actions/cart-actions";
import { fetchSections } from "@/actions/products-actions";

export default function InitCart() {
  const { enqueueSnackbar } = useSnackbar();
  const { initProducts, setDeliveryFee } = useCartStore();

  useEffect(() => {
    (async () => {
      const sectionRes = await fetchSections();

      if ("error" in sectionRes) {
        enqueueSnackbar(sectionRes.error, { variant: "error" });
      } else {
        setDeliveryFee(Number(sectionRes[0].delivery_price));
      }

      const cartRes = await fetchCartProducts();

      if ("error" in cartRes) {
        enqueueSnackbar(cartRes.error, { variant: "error" });
      } else {
        initProducts(cartRes);
      }
    })();
  }, [enqueueSnackbar, initProducts, setDeliveryFee]);

  return null;
}

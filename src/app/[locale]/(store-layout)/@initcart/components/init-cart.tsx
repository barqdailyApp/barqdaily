"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";

import { useCartStore } from "@/contexts/cart-store";
import { fetchCartProducts } from "@/actions/cart-actions";
import { fetchSections } from "@/actions/products-actions";
import { fetchAddresses } from "@/actions/profile-actions";
import { usecheckoutStore } from "@/contexts/checkout-store";

export default function InitCart() {
  const { enqueueSnackbar } = useSnackbar();
  const { initProducts, setDeliveryFee } = useCartStore();
  const { setAddresses, setDeliveryTypes } = usecheckoutStore();

  useEffect(() => {
    (async () => {
      const cartRes = await fetchCartProducts();

      if ("error" in cartRes) {
        enqueueSnackbar(cartRes.error, { variant: "error" });
      } else {
        initProducts(cartRes);
      }

      const sectionRes = await fetchSections();

      if ("error" in sectionRes) {
        enqueueSnackbar(sectionRes.error, { variant: "error" });
      } else {
        setDeliveryFee(Number(sectionRes[0].delivery_price));
        setDeliveryTypes(sectionRes[0].delivery_type_list as "FAST"[]);
      }

      const addressesRes = await fetchAddresses();

      if ("error" in addressesRes) {
        enqueueSnackbar(addressesRes.error, { variant: "error" });
      } else {
        setAddresses(addressesRes);
      }
    })();
  }, [
    enqueueSnackbar,
    initProducts,
    setAddresses,
    setDeliveryFee,
    setDeliveryTypes,
  ]);

  return null;
}

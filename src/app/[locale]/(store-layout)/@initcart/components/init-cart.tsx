"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";

import { useAuthContext } from "@/auth/hooks";
import { useCartStore } from "@/contexts/cart-store";
import { fetchSections } from "@/actions/products-actions";
import { fetchAddresses } from "@/actions/profile-actions";
import { usecheckoutStore } from "@/contexts/checkout-store";
import { fetchPayments, fetchCartProducts } from "@/actions/cart-actions";

export default function InitCart() {
  const { authenticated } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const { initProducts, setDeliveryFee, setMinOrderPrice } = useCartStore();
  const { setAddresses, setDeliveryTypes, setPayments } = usecheckoutStore();

  useEffect(() => {
    if (!authenticated) return;
    (async () => {
      const cartRes = await fetchCartProducts();

      if ("error" in cartRes) {
        if (cartRes.status !== 401)
          enqueueSnackbar(cartRes.error, { variant: "error" });
      } else {
        initProducts(cartRes);
      }

      const sectionRes = await fetchSections();

      if ("error" in sectionRes) {
        if (sectionRes.status !== 401)
          enqueueSnackbar(sectionRes.error, { variant: "error" });
      } else {
        setMinOrderPrice(Number(sectionRes[0].min_order_price));
        setDeliveryFee(Number(sectionRes[0].delivery_price));
        setDeliveryTypes(sectionRes[0].delivery_type_list as "FAST"[]);
      }

      const addressesRes = await fetchAddresses();

      if ("error" in addressesRes) {
        if (addressesRes.status !== 401)
          enqueueSnackbar(addressesRes.error, { variant: "error" });
      } else {
        setAddresses(addressesRes);
      }

      const paymentsRes = await fetchPayments();

      if ("error" in paymentsRes) {
        if (paymentsRes.status !== 401)
          enqueueSnackbar(paymentsRes.error, { variant: "error" });
      } else {
        setPayments(paymentsRes);
      }
    })();
  }, [
    authenticated,
    enqueueSnackbar,
    initProducts,
    setAddresses,
    setDeliveryFee,
    setDeliveryTypes,
    setMinOrderPrice,
    setPayments,
  ]);

  return null;
}

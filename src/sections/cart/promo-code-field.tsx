import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";

import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useCartStore } from "@/contexts/cart-store";
import { fetchPromoCode } from "@/actions/cart-actions";
import { usecheckoutStore } from "@/contexts/checkout-store";

export default function PromoCodeField() {
  const t = useTranslations("Pages.Cart.PromoCode");
  const { enqueueSnackbar } = useSnackbar();
  const { choosenPayment } = usecheckoutStore();
  const { setPromocode } = useCartStore();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    if (!code.length) return;

    (async () => {
      setLoading(true);
      const res = await fetchPromoCode(code, choosenPayment?.id || "");
      if ("error" in res) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        setPromocode(res);
      }
      setLoading(false);
    })();
  }, [choosenPayment?.id, code, enqueueSnackbar, setPromocode]);

  if (!choosenPayment?.type) return null;
  return (
    <TextField
      sx={{ mt: 1 }}
      onChange={(e) => setCode(e.target.value)}
      InputProps={{
        endAdornment: (
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleClick()}
          >
            {t("apply")}
          </LoadingButton>
        ),
      }}
      placeholder={t("label")}
      fullWidth
    />
  );
}

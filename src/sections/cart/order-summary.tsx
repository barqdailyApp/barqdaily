import { useTranslations } from "next-intl";

import {
  Card,
  Stack,
  Button,
  Divider,
  Typography,
  CardContent,
} from "@mui/material";

import { useDir } from "@/routes/hooks/use-dir";

import { useCurrency } from "@/utils/format-number";

import { useCartStore } from "@/contexts/cart-store";
import { usecheckoutStore } from "@/contexts/checkout-store";

import Iconify from "@/components/iconify";

export default function OrderSumamry() {
  const t = useTranslations("Pages.Cart.Summary");
  const dir = useDir();
  const currency = useCurrency();
  const { step, setStep } = usecheckoutStore();
  const { totalPrice, deliveryFee } = useCartStore();

  const fields = [
    {
      label: t("products-total"),
      value: currency(totalPrice),
    },
    {
      label: t("shipping"),
      value: currency(deliveryFee),
    },
    {
      label: t("total"),
      value: currency(totalPrice + deliveryFee),
    },
  ];

  const renderFields = (
    <Stack spacing={1}>
      {fields.map((item) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1 }}
          key={item.label}
        >
          <Typography variant="body2" fontWeight="500">
            {item.label}
          </Typography>
          <Typography variant="subtitle2" fontWeight="400">
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={1}>
      {step > 0 && (
        <Button
          variant="outlined"
          onClick={() => setStep((prev) => prev - 1)}
          sx={{ flexShrink: 0 }}
        >
          <Iconify
            icon="ic:round-keyboard-arrow-left"
            sx={{
              transform: dir === "rtl" ? "rotate(180deg)" : undefined,
              minWidth: 0,
            }}
          />
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setStep((prev) => prev + 1)}
        sx={{ flexGrow: 1 }}
      >
        {t("next")}
      </Button>
    </Stack>
  );

  return (
    <Card
      sx={{
        border: "1px solid #CFCFCF",
        borderRadius: "20px",
        padding: 0.3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          {t("title")}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {renderFields}

        <Divider sx={{ my: 2 }} />

        {renderActions}
      </CardContent>
    </Card>
  );
}

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
import { useFormatDate } from "@/utils/format-time";

import { useCartStore } from "@/contexts/cart-store";
import { usecheckoutStore } from "@/contexts/checkout-store";

import Iconify from "@/components/iconify";

export default function OrderSumamry() {
  const t = useTranslations("Pages.Cart");
  const dir = useDir();
  const currency = useCurrency();
  const formateDate = useFormatDate();
  const { step, setStep, choosenDeliveryType, day, timeSlot, choosenAddress } =
    usecheckoutStore();
  const { totalPrice, deliveryFee } = useCartStore();

  const fields: (string | { label: string; value: string })[] = [
    {
      label: t("Summary.products-total"),
      value: currency(totalPrice),
    },
    {
      label: t("Summary.shipping"),
      value: currency(deliveryFee),
    },
    {
      label: t("Summary.total"),
      value: currency(totalPrice + deliveryFee),
    },
  ];

  if (step > 1)
    fields.push("divider", {
      label: t("Summary.delivery-type"),
      value:
        choosenDeliveryType === "SCHEDULED"
          ? t(`DeliveryTypes.${choosenDeliveryType}`)
          : t("FAST"),
    });

  if (step > 1 && choosenDeliveryType === "SCHEDULED")
    fields.push(
      {
        label: t("Summary.delivery-day"),
        value: formateDate(day),
      },
      {
        label: t("Summary.delivery-time"),
        value: `${timeSlot?.start_time} - ${timeSlot?.end_time} ${t(`TimeZones.${timeSlot?.time_zone}`)}`,
      }
    );

  if (step > 1 && choosenDeliveryType !== "WAREHOUSE_PICKUP")
    fields.push({
      label: t("Summary.delivery-address"),
      value: choosenAddress?.name || "",
    });

  const renderFields = (
    <Stack spacing={1}>
      {fields.map((item, index) =>
        typeof item === "string" ? (
          <Divider key={index} flexItem />
        ) : (
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
        )
      )}
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
        {t("Summary.next")}
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
          {t("Summary.title")}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {renderFields}

        <Divider sx={{ my: 2 }} />

        {renderActions}
      </CardContent>
    </Card>
  );
}

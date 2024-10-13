import { useTranslations } from "next-intl";

import { Card, Stack, Button, Typography, CardContent } from "@mui/material";

import { useCurrency } from "@/utils/format-number";

import { SingleShipment } from "@/types/order-shipment";

export function OrderSummaryCard({ shipment }: { shipment: SingleShipment }) {
  const t = useTranslations("Pages.Orders");
  const currency = useCurrency();

  const fields = [
    {
      label: t("products_price"),
      value: currency(shipment.order.products_price),
    },
    { label: t("delivery_fee"), value: currency(shipment.order.delivery_fee) },
    { label: t("total"), value: currency(shipment.order.total_price) },
    {
      label: t("payment_method"),
      value: t(`Payment.${shipment.order.payment_method}`),
    },
  ];

  return (
    <Card
      sx={{
        border: "1px solid #CFCFCF",
        borderRadius: "20px",
        padding: 0.3,
      }}
    >
      <CardContent>
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
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              size="large"
              sx={{ border: "none", width: "156px", height: "60px" }}
            >
              Cancel order
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

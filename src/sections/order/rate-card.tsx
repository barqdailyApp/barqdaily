import { useTranslations } from "next-intl";

import { Card, Stack, Rating, Typography, CardContent } from "@mui/material";

import { ShipmentFeedback } from "@/types/order-shipment";

export default function RateCard({ feedback }: { feedback: ShipmentFeedback }) {
  const t = useTranslations("Pages.Orders.Single.Rate");

  return (
    <Card
      sx={{
        border: "1px solid #CFCFCF",
        borderRadius: "20px",
        padding: 0.3,
      }}
    >
      <CardContent>
        <Typography variant="body1" fontWeight="bold" textAlign="center">
          {t("title")}
        </Typography>

        <Stack spacing={1} pt={2}>
          {["delivery_time", "packaging", "communication"].map((name) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              key={name}
            >
              <Typography component="legend">{t(name)}</Typography>
              <Rating
                value={Number(feedback[name as "delivery_time"])}
                readOnly
                size="small"
              />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

import { useTranslations } from "next-intl";

import { Box, Stack, Container, Typography } from "@mui/material";

import { FullOrder } from "@/types/order-details";
import { SingleShipment } from "@/types/order-shipment";

import RateCard from "../rate-card";
import { OrderDetailsCard } from "../order-details";
import { OrderProcessCard } from "../order-process";
import { OrderSummaryCard } from "../order-summary";
import { OrderDriverInfoCard } from "../order-driver";

export default function SingleOrderView({
  order,
  shipment,
}: {
  order: FullOrder;
  shipment: SingleShipment;
}) {
  const t = useTranslations("Pages.Orders.Single");

  const renderHeadding = (
    <Stack alignItems="center" py={7} bgcolor="background.neutral">
      <Typography variant="h4" fontWeight="bold" textAlign="center">
        {t("title")}
      </Typography>
    </Stack>
  );

  return (
    <Box>
      {renderHeadding}
      <Box
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container>
          <Stack gap={8} direction={{ md: "row" }}>
            <OrderDetailsCard
              shipmentPrdoucts={order.shipments.shipment_products}
            />

            <Stack spacing={2} width={{ md: "380px" }} flexShrink={0}>
              {order.shipments.driver && (
                <OrderDriverInfoCard driver={order.shipments.driver} />
              )}

              <OrderProcessCard
                orderNumber={order.order_number}
                orderShipments={order.shipments}
                deliveryType={shipment.order.delivery_type}
              />

              <OrderSummaryCard shipment={shipment} />

              {shipment.shipment_feedback && (
                <RateCard feedback={shipment.shipment_feedback} />
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

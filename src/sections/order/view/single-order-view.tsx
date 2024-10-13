import { useTranslations } from "next-intl";

import { Box, Stack, Container, Typography } from "@mui/material";

import { FullOrder } from "@/types/order-details";

import { OrderDetailsCard } from "../order-details";
import { OrderProcessCard } from "../order-process";
import { OrderSummaryCard } from "../order-summary";
import { OrderDriverInfoCard } from "../order-driver";

export default function SingleOrderView({
  orderdetails,
}: {
  orderdetails: FullOrder;
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
              shipmentPrdoucts={orderdetails.shipments.shipment_products}
            />

            <Stack spacing={2} width={{ md: "380px" }} flexShrink={0}>
              <OrderDriverInfoCard />

              <OrderProcessCard orderNumber={orderdetails.order_number} />

              <OrderSummaryCard />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

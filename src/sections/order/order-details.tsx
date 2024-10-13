import { Fragment } from "react";
import { useTranslations } from "next-intl";

import { Stack, Divider, Typography } from "@mui/material";

import { ShipmentProduct } from "@/types/order-details";

import ShipmentItem from "./shipment-item";

export function OrderDetailsCard({
  shipmentPrdoucts,
}: {
  shipmentPrdoucts: ShipmentProduct[];
}) {
  const t = useTranslations("Pages.Orders.Single");

  return (
    <Stack spacing={2} py={2} alignItems="stretch" width="100%">
      <Typography variant="h6" gutterBottom>
        {t("order_details_title")}
      </Typography>

      {shipmentPrdoucts.map((item, index) => (
        <Fragment key={index}>
          {index !== 0 ? <Divider flexItem /> : null}

          <ShipmentItem shipment={item} />
        </Fragment>
      ))}
    </Stack>
  );
}

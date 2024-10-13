import Image from "next/image";
import { Fragment } from "react";
import { useTranslations } from "next-intl";

import { Box, Stack, Divider, Typography } from "@mui/material";

import { paths } from "@/routes/paths";

import { useCurrency } from "@/utils/format-number";

import { ShipmentProduct } from "@/types/order-details";
import ButtonLink from "@/routes/components/link-button";

export function OrderDetailsCard({
  shipmentPrdoucts,
}: {
  shipmentPrdoucts: ShipmentProduct[];
}) {
  const t = useTranslations("Pages.Order");

  const currency = useCurrency();

  return (
    <Stack spacing={2} pt={2} alignItems="stretch" width="100%">
      <Typography variant="h6" gutterBottom>
        {t("order_details_title")}
      </Typography>
      {shipmentPrdoucts.map((item, index) => (
        <Fragment key={index}>
          {index !== 0 ? <Divider flexItem /> : null}

          <Box px={2}>
            <Stack spacing={1} justifyContent="flex-start">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Image
                  src={item.product_logo}
                  alt={item.product_name}
                  width={60}
                  height={60}
                  style={{
                    borderRadius: "50px",
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {item.product_name}
                  </Typography>
                  <Typography variant="body2" mt={0.5}>
                    {`${t("quantity")} : ${item.quantity}`}
                  </Typography>
                </Box>
                <Typography variant="body2" flexShrink={0}>
                  <Typography
                    variant="inherit"
                    fontWeight="bold"
                    component="span"
                  >
                    {`${currency(item.product_price)} / `}
                  </Typography>
                  {item.measurement_unit}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mt: 1 }}
              >
                <Typography variant="subtitle2">
                  {`${t("total")} : `}
                  <Typography
                    variant="inherit"
                    fontWeight="bold"
                    component="span"
                  >
                    {currency(item.total_price)}
                  </Typography>
                </Typography>

                <ButtonLink
                  variant="contained"
                  color="primary"
                  href={`${paths.products}/${item.product_id}`}
                >
                  {t("buy_again")}
                </ButtonLink>
              </Stack>
            </Stack>
          </Box>
        </Fragment>
      ))}
    </Stack>
  );
}

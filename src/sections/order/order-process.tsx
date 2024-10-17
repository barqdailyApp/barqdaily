import { useTranslations } from "next-intl";

import Timeline from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { Box, Card, Stack, Typography, CardContent } from "@mui/material";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import { useFormatDate, useFormatTime } from "@/utils/format-time";

import { CircularStatus } from "@/theme/overrides/components/circular-status";

import Label from "@/components/label";
import Iconify from "@/components/iconify";

import { Shipments } from "@/types/order-details";

import orderStatusCircles from "./order-status-cricles";

export function OrderProcessCard({
  orderNumber,
  orderShipments,
  deliveryType,
}: {
  orderNumber: string;
  orderShipments: Shipments;
  deliveryType: string;
}) {
  const t = useTranslations("Pages.Orders");
  const formatTime = useFormatTime();
  const formatDate = useFormatDate();

  const statusText = [
    {
      label: t("Single.Status.confirmed"),
      date: orderShipments.order_confirmed_at,
    },
    {
      label: t("Single.Status.processing"),
      date: orderShipments.order_on_processed_at,
    },
    {
      label: t("Single.Status.picked_up"),
      date: orderShipments.order_shipped_at,
    },
    {
      label: t("Single.Status.delivered"),
      date: orderShipments.order_delivered_at,
    },
    {
      label: t("Single.Status.canceled"),
      date: orderShipments.order_canceled_at,
    },
  ];

  const renderCancelCircle = (
    <CircularStatus color="error">
      <Iconify icon="material-symbols:close" width={15} />
    </CircularStatus>
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" fontWeight="bold" textAlign="center">
            {`${t("order_number")}: ${orderNumber}`}
          </Typography>
          <Label variant="soft" color="info" sx={{ flexShrink: 0 }}>
            {t(`DeliveryType.${deliveryType}`)}
          </Label>
        </Stack>

        <Timeline
          sx={{
            px: 0,
            mt: 3,
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {[
            ...orderStatusCircles(orderShipments.status),
            renderCancelCircle,
          ].map((item, index) =>
            statusText[index].date ? (
              <TimelineItem key={item.key}>
                <TimelineSeparator>
                  {item}
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ paddingInlineEnd: 0 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {statusText[index].label}
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="400" mt={0.5}>
                        {formatDate(
                          new Date(statusText[index].date),
                          "MMMM dd, yyyy"
                        )}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="400"
                      textAlign="end"
                    >
                      {formatTime(new Date(statusText[index].date), "hh:mm a")}
                    </Typography>
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            ) : null
          )}
        </Timeline>
      </CardContent>
    </Card>
  );
}

import { useTranslations } from "next-intl";

import Timeline from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { Box, Card, Stack, Typography, CardContent } from "@mui/material";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import { useFormatDate, useFormatTime } from "@/utils/format-time";

import { Shipments } from "@/types/order-details";

import orderStatusCircles from "./order-status-cricles";

export function OrderProcessCard({
  orderNumber,
  orderShipments,
}: {
  orderNumber: string;
  orderShipments: Shipments;
}) {
  const t = useTranslations("Pages.Orders.Single.Status");
  const formatTime = useFormatTime();
  const formatDate = useFormatDate();

  const statusText = [
    {
      label: t("confirmed"),
      date: orderShipments.order_confirmed_at,
    },
    {
      label: t("processing"),
      date: orderShipments.order_on_processed_at,
    },
    {
      label: t("picked_up"),
      date: orderShipments.order_shipped_at,
    },
    {
      label: t("delivered"),
      date: orderShipments.order_delivered_at,
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
        <Typography
          variant="body1"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3 }}
        >
          {orderNumber}
        </Typography>
        <Box sx={{ px: -1 }}>
          <Stack spacing={1}>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {orderStatusCircles(orderShipments.status).map((item, index) =>
                statusText[index].date ? (
                  <TimelineItem>
                    <TimelineSeparator>
                      {item}
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Box>
                          <Typography variant="body2">
                            {statusText[index].label}
                          </Typography>
                          <Typography variant="caption" fontWeight="400">
                            {formatDate(
                              new Date(statusText[index].date),
                              "MMMM dd, yyyy"
                            )}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          fontWeight="400"
                          textAlign="end"
                        >
                          {formatTime(
                            new Date(statusText[index].date),
                            "hh:mm a"
                          )}
                        </Typography>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                ) : null
              )}
            </Timeline>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

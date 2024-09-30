"use client";
import { useState, useCallback } from "react";
import {
  Container,
  IconButton,
  Tab,
  Tabs,
  Box,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SportsMotorsportsOutlinedIcon from "@mui/icons-material/SportsMotorsportsOutlined";
import Label, { LabelColor } from "@/components/label";
import { Order } from "@/types/order";
import Iconify from "@/components/iconify";
import { status } from "nprogress";
import MapIcon from "@mui/icons-material/Map";
import CommentIcon from "@mui/icons-material/Comment";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTranslations } from "next-intl";

interface Props {
  initialStatus?: string;
  orders: Order[];
}

const orderStatuses = [
  { label: "All Orders", value: "all-orders" },
  { label: "Confirmed", value: "confirmed" },
  { label: "On Process", value: "on-process" },
  { label: "Out for Delivery", value: "out-for-delivery" },
  { label: "Delivered", value: "delivered" },
  { label: "Canceled", value: "canceled" },
  { label: "Returned", value: "returned" },
];
const icons = [
  {
    icon: "material-symbols:check",
    color: "success.main",
  },
  {
    icon: "ph:gift",
    color: "warning.main",
  },
  {
    icon: "mdi:truck-outline",
    color: "#ab47bc",
  },
  {
    icon: "lucide:smile",
    color: "primary.main",
  },
];

const Status = [
  {
    status: "CONFIRMED",
    color: "success" as LabelColor,
  },
  {
    status: "CANCELED",
    color: "error" as LabelColor,
  },
  {
    status: "OUT FOR DELIVERY",
    color: "#ab47bc" as LabelColor,
  },
  {
    status: "DELIVERED",
    color: "primary" as LabelColor,
  },
  {
    status: "RETURNED",
    color: "warning" as LabelColor,
  },
];
export default function OrderView({ initialStatus, orders }: Props) {
  const [selectedStatus, setSelectedStatus] = useState(
    initialStatus || "all-orders"
  );

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setSelectedStatus(newValue);
    },
    []
  );
  const t = useTranslations("Pages.Order");

  return (
    <Container sx={{ padding: 4 }}>
      <Tabs
        value={selectedStatus}
        onChange={handleChange}
        aria-label="Order Status Navigation"
      >
        {orderStatuses.map((status) => (
          <Tab
            label={status.label}
            key={status.value}
            value={status.value}
            sx={{ px: 2 }}
          />
        ))}
      </Tabs>
      <Stack spacing={1}>
        {orders.map((order) => (
          <OrderCard key={order.order_id} order={order} />
        ))}
      </Stack>
    </Container>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <Card
      sx={{
        marginTop: 4,
        width: "100%",
        border: "solid 1px",
        borderColor: "grey",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {order.shipments.status && (
              <Label
                color={
                  Status.find((item) => item.status === order.shipments.status)
                    ?.color || "primary"
                }
                variant="soft"
                sx={{ fontWeight: "bold" }}
              >
                {order.shipments.status}
              </Label>
            )}

            {icons.map((item, index) => (
              <Box
                key={index}
                sx={{
                  color: item.color,
                  border: "solid 1px",
                  borderColor: item.color,
                  borderRadius: "50px",
                  padding: 0.75,
                }}
              >
                <Iconify icon={item.icon} width={15} />
              </Box>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="start"
          >
            <Stack direction="column" spacing={0.5}>
              <Typography variant="caption">Driver Name</Typography>
              <Typography variant="body2" fontWeight="bold">
                {order.shipments.driver?.username}
              </Typography>
            </Stack>
            <Iconify icon="tabler:helmet"></Iconify>
          </Stack>
        </Box>
        <Stack
          direction="row"
          spacing={15}
          alignItems="start"
          justifyContent="space-between"
          sx={{ width: "100%", mt: 1 }}
        >
          <Stack direction="column" spacing={0.5} alignItems="center">
            <Typography variant="caption">OrderID</Typography>
            <Typography variant="body2" fontWeight="bold">
              Omar Wael
            </Typography>
          </Stack>

          <Stack direction="column" spacing={0.5} alignItems="center">
            <Typography variant="caption">Deliver To</Typography>
            <Typography variant="body2" fontWeight="bold">
              {order.address.address}
            </Typography>
          </Stack>

          <Stack direction="column" spacing={0.5} alignItems="center">
            <Typography variant="caption">Total Payment</Typography>
            <Typography variant="body2" fontWeight="bold">
              {order.total_price} YER
            </Typography>
          </Stack>

          <Stack direction="column" spacing={0.5} alignItems="center">
            <Typography variant="caption">Arrival Time</Typography>
            <Typography variant="body2" fontWeight="bold">
              {order.delivery_day}
            </Typography>
            <Typography variant="caption">
              {order.estimated_delivery_time}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button color="primary">
              <Iconify icon="material-symbols-light:map-outline" />
            </Button>
            <Button color="primary">
              <Iconify icon="majesticons:comment-line" />
            </Button>
            <Button color="primary">
              <Iconify icon="ic:outline-phone" />
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

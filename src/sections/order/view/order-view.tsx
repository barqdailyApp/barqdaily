"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Stack, Alert, Container } from "@mui/material";

import { Order } from "@/types/order";

import OrderCard from "../order-card";
import StatusFilter from "../status-filter";

interface Props {
  initialStatus?: string;
  orders: Order[];
}

export default function OrderView({ initialStatus, orders }: Props) {
  const [statusFilter, setStatusFilter] = useState(
    initialStatus || "all-orders"
  );

  const filteredOrders = orders.filter(
    (order) =>
      statusFilter === "all-orders" ||
      order.shipments.status === statusFilter.toUpperCase()
  );

  const t = useTranslations();

  return (
    <Container sx={{ padding: 4 }}>
      <StatusFilter
        initialStatus={initialStatus}
        onStatusChange={(status) => setStatusFilter(status)}
      />
      {filteredOrders.length === 0 ? (
        <Alert severity="warning" sx={{ mt: 3 }}>
          {t("Pages.Order.error")}
        </Alert>
      ) : (
        <Stack spacing={1}>
          {filteredOrders.map((order) => (
            <OrderCard key={order.order_id} order={order} />
          ))}
        </Stack>
      )}
    </Container>
  );
}

"use client";

import { Stack, Container } from "@mui/material";

import { Order } from "@/types/order";

import OrderCard from "../order-card";
import StatusFilter from "../status-filter";

interface Props {
  initialStatus?: string;
  orders: Order[];
}

export default function OrderView({ initialStatus, orders }: Props) {
  return (
    <Container sx={{ padding: 4 }}>
      <StatusFilter initialStatus={initialStatus} />
      <Stack spacing={1}>
        {orders.map((order) => (
          <OrderCard key={order.order_id} order={order} />
        ))}
      </Stack>
    </Container>
  );
}

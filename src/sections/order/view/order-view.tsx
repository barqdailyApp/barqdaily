import { useTranslations } from "next-intl";

import { Stack, Alert, Container } from "@mui/material";

import ParamsPagination from "@/CustomSharedComponents/params-pagination";

import { Order } from "@/types/order";

import OrderCard from "../order-card";
import StatusFilter from "../status-filter";

interface Props {
  orders: Order[];
  pagesCount: number;
}

export default function OrderView({ orders, pagesCount }: Props) {
  const t = useTranslations();

  return (
    <Container sx={{ padding: 4 }}>
      <StatusFilter />
      {orders.length === 0 ? (
        <Alert severity="warning" sx={{ mt: 3 }}>
          {t("Pages.Orders.no_orders")}
        </Alert>
      ) : (
        <Stack spacing={1}>
          {orders.map((order) => (
            <OrderCard key={order.order_id} order={order} />
          ))}
        </Stack>
      )}

      {pagesCount > 1 && <ParamsPagination pagesCount={pagesCount} />}
    </Container>
  );
}

import { Grid, Container } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

import SectionHeadding from "./components/section-headding";
import OrderAgainProductCard from "./components/order-again-product-card";

export default function OrderAgain({ orders }: { orders: any[] }) {
  return (
    <Container sx={{ py: SECTION_PADDING }}>
      <SectionHeadding titleName="order_again_title" href="/" />
      <Grid container spacing={3} pt={{ xs: 3, sm: 6 }}>
        {orders.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.product_id}>
            <OrderAgainProductCard order={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import { Grid, Container } from "@mui/material";

import SectionHeadding from "./components/section-headding";
import OrderAgainProductCard from "./components/order-again-product-card";

export default function OrderAgain({ orders }: { orders: any[] }) {
  return (
    <Container sx={{ py: { xs: 4, sm: 6 } }}>
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

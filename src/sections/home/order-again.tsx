import RouterLink from "next/link";
import { useTranslations } from "next-intl";

import { Grid, Link, Stack, Container, Typography } from "@mui/material";

import { paths } from "@/routes/paths";

import { SECTION_PADDING } from "@/layouts/config-layout";

import Iconify from "@/components/iconify";

import OrderAgainProductCard from "./components/order-again-product-card";

export default function OrderAgain({ orders }: { orders: any[] }) {
  const t = useTranslations("Pages.Home");

  const headding = (
    <Stack direction="row" spacing={3} justifyContent="space-between">
      <Typography variant="h4">{t("order_again_title")}</Typography>
      <Link
        href={paths.orders}
        variant="h6"
        sx={{ display: "flex", alignItems: "center", gap: 0.25 }}
        component={RouterLink}
      >
        {t("action")}
        <Iconify
          icon="weui:arrow-filled"
          sx={{ "[dir='rtl'] &": { transform: "scaleX(-1)" } }}
          width={24}
        />
      </Link>
    </Stack>
  );

  return (
    <Container sx={{ py: SECTION_PADDING }}>
      {headding}

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

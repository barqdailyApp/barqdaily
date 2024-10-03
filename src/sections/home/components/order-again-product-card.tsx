import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  Box,
  Card,
  Stack,
  Button,
  Avatar,
  Typography,
  AvatarGroup,
} from "@mui/material";

import Iconify from "@/components/iconify";

export default function OrderAgainProductCard({ order }: { order: any }) {
  const t = useTranslations();

  const { products } = order.shipments;

  const images = products.map((item: any) => ({
    src: item.product_logo,
    name: item.product_name,
  }));
  const names = products.map(
    (item: any) => `${item.measurement_unit_name} ${item.product_name}`
  );

  return (
    <Card sx={{ minHeight: "100%", display: "grid" }}>
      <Stack p={2} minHeight="100%">
        <AvatarGroup max={5}>
          {images.map((item: any) => (
            <Avatar
              alt={item.name}
              src={item.src}
              key={`${item.name}-${item.src}`}
            />
          ))}
        </AvatarGroup>

        <Typography variant="h6" fontWeight={700} color="primary" mt={1}>
          {`${order.total_price} ${t("Global.currency")}`}
        </Typography>
        <Typography variant="caption" component="p" mt={0.5}>
          {names.join(`${t("Global.comma")} `)}
        </Typography>

        <Box flexGrow={1} />

        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="bxs:cart-alt" />}
          sx={{ display: "flex", mt: 2 }}
          LinkComponent={Link}
          href={`${"orders"}/${order.order_id}`}
        >
          {t("Pages.Home.order_again")}
        </Button>
      </Stack>
    </Card>
  );
}

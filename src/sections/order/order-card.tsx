import { useLocale, useTranslations } from "next-intl";

import {
  Box,
  Card,
  Link,
  Stack,
  Button,
  Typography,
  CardContent,
} from "@mui/material";

import { paths } from "@/routes/paths";

import { useCurrency } from "@/utils/format-number";
import { useFormatTime } from "@/utils/format-time";

import { LocaleType, localesSettings } from "@/i18n/config-locale";

import Label from "@/components/label";
import Iconify from "@/components/iconify";

import { Order } from "@/types/order";

import orderStatusCircles from "./order-status-cricles";
import { WEEK_DAYS, STATUS_SETTINGS } from "./config-orders";

export default function OrderCard({ order }: { order: Order }) {
  const t = useTranslations();
  const currency = useCurrency();
  const locale = useLocale();
  const { dir } = localesSettings[locale as LocaleType];
  const formatTime = useFormatTime();

  const deliveryDate = t(
    `Global.Date.${WEEK_DAYS[new Date(order.estimated_delivery_time).getDay()]}`
  );
  const deliveryTime = formatTime(
    new Date(order.estimated_delivery_time),
    "hh:mm a"
  );

  const status = STATUS_SETTINGS[order.shipments.status];

  const driver = order.shipments.driver?.username;

  const renderStatus = (
    <Stack direction="row" spacing={1} alignItems="center">
      {order.shipments.status && (
        <Label color={status.color} variant="soft" sx={{ fontWeight: "bold" }}>
          {t(`Pages.Orders.Status.${status.label}`)}
        </Label>
      )}

      {orderStatusCircles(order.shipments.status)}
    </Stack>
  );

  const renderDetails = (
    <Stack
      direction="row"
      spacing={{ xs: 4, md: 10 }}
      alignItems="start"
      justifyContent={{ xs: "space-between", md: "flex-start" }}
      sx={{ width: "100%", mt: 1 }}
      flexWrap="wrap"
    >
      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption">
          {t("Pages.Orders.order_number")}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {order.order_number}
        </Typography>
      </Stack>

      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption">
          {t("Pages.Orders.deliver_to")}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {order.address.address}
        </Typography>
      </Stack>

      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption">
          {t("Pages.Orders.total_payment")}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {currency(order.total_price)}
        </Typography>
      </Stack>

      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption">
          {t("Pages.Orders.arrival_time")}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {`${deliveryDate} ${deliveryTime}`}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderDriver = (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      justifyContent="start"
    >
      <Stack direction="column" spacing={0.5}>
        <Typography variant="caption">
          {t("Pages.Orders.driver_name")}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {driver}
        </Typography>
      </Stack>
      <Box
        sx={{
          borderRadius: "10rem",
          p: 1.5,
          bgcolor: "grey.200",
          transform: dir === "ltr" ? "scaleX(-1)" : "",
        }}
      >
        <Iconify icon="tabler:helmet" width={24} />
      </Box>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Button
        color="primary"
        variant="contained"
        sx={{ borderRadius: "10rem", p: 1, minWidth: 0 }}
      >
        <Iconify icon="material-symbols:map-outline" />
      </Button>
      <Button
        color="primary"
        variant="contained"
        sx={{ borderRadius: "10rem", p: 1, minWidth: 0 }}
      >
        <Iconify icon="majesticons:comment-line" />
      </Button>
      <Button
        color="primary"
        variant="contained"
        sx={{ borderRadius: "10rem", p: 1, minWidth: 0 }}
      >
        <Iconify icon="ic:outline-phone" />
      </Button>
    </Stack>
  );

  return (
    <Card
      sx={(theme) => ({
        marginTop: 4,
        width: "100%",
        border: "solid 1px",
        borderColor: "grey.200",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        "&.selected": { border: `1px solid ${theme.palette.primary.main}` },
        "&:hover": {
          boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}, 0px 0px 0px 4px ${theme.palette.primary.main}`,
          "&:has(.card-clickable-layer:active)": {
            boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`,
          },
          zIndex: 9,
        },
      })}
    >
      <Box
        className="card-clickable-layer"
        aria-hidden
        sx={{ position: "absolute", inset: 0, cursor: "pointer" }}
        href={`${paths.orders}/${order.order_id}`}
        component={Link}
      />

      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          rowGap={4}
          columnGap={8}
        >
          <Stack spacing={4} justifyContent="space-between" flexGrow={1}>
            {renderStatus}
            {renderDetails}
          </Stack>
          {driver && (
            <Stack
              spacing={4}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "stretch" }}
              direction={{ xs: "row", md: "column" }}
              flexWrap="wrap"
            >
              {renderDriver}
              {renderActions}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

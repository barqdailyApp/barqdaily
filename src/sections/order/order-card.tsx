import { useLocale, useTranslations } from "next-intl";

import {
  Box,
  Card,
  Stack,
  alpha,
  Button,
  Typography,
  CardContent,
  Link,
} from "@mui/material";

import { fDate } from "@/utils/format-time";

import { LocaleType, localesSettings } from "@/i18n/config-locale";

import Label from "@/components/label";
import Iconify from "@/components/iconify";

import { Order } from "@/types/order";

import { icons, WEEK_DAYS, STATUS_SETTINGS } from "./config-orders";
import { paths } from "@/routes/paths";

export default function OrderCard({ order }: { order: Order }) {
  const t = useTranslations();
  const locale = useLocale();
  const { dir } = localesSettings[locale as LocaleType];

  const deliveryDate = t(
    `Global.Date.${WEEK_DAYS[new Date(order.estimated_delivery_time).getDay()]}`
  );
  const deliveryTime = fDate(
    new Date(order.estimated_delivery_time),
    "hh:mm a"
  ).replace(/AM|PM/g, (matched) => t(`Global.Date.${matched}`));

  const status = STATUS_SETTINGS[order.shipments.status];

  const driver = order.shipments.driver?.username;

  const renderStatus = (
    <Stack direction="row" spacing={1} alignItems="center">
      {order.shipments.status && (
        <Label color={status.color} variant="soft" sx={{ fontWeight: "bold" }}>
          {t(`Pages.Order.Status.${status.label}`)}
        </Label>
      )}

      {icons.map((item, iconIndex) => {
        const statusIndex = status.index;
        return (
          <Box
            key={iconIndex}
            sx={(theme) => ({
              color:
                iconIndex <= statusIndex
                  ? `${item.color}.main`
                  : "text.disabled",
              bgcolor:
                iconIndex <= statusIndex
                  ? alpha(
                      theme.palette?.[item.color as "primary" | "secondary"]
                        .main,
                      0.1
                    )
                  : undefined,
              border: "solid 1px",
              borderColor:
                // eslint-disable-next-line no-nested-ternary
                iconIndex > statusIndex
                  ? "text.disabled"
                  : iconIndex === statusIndex
                    ? `${item.color}.main`
                    : "transparent",
              borderRadius: "50px",
              padding: 0.75,
            })}
          >
            <Iconify icon={item.icon} width={15} />
          </Box>
        );
      })}
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
          {t("Pages.Order.order_number")}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {order.order_number}
        </Typography>
      </Stack>

      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption">{t("Pages.Order.deliver_to")}</Typography>
        <Typography variant="body2" fontWeight="bold">
          {order.address.address}
        </Typography>
      </Stack>

      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption">
          {t("Pages.Order.total_payment")}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {`${order.total_price} ${t("Global.currency")}`}
        </Typography>
      </Stack>

      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption">
          {t("Pages.Order.arrival_time")}
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
        <Typography variant="caption">Driver Name</Typography>
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

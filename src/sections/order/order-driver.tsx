import { useTranslations } from "next-intl";

import {
  Box,
  Card,
  Stack,
  Button,
  Typography,
  CardContent,
} from "@mui/material";

import { getCurrentLocale } from "@/utils/get-locale";

import Iconify from "@/components/iconify";

import { Driver } from "@/types/order-details";

export async function OrderDriverInfoCard({ driver }: { driver: Driver }) {
  const t = useTranslations("Pages.Orders");
  const { dir } = await getCurrentLocale();

  return (
    <Card
      sx={{
        border: "1px solid #CFCFCF",
        borderRadius: "20px",
        padding: 0.3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 2 }}
        >
          {t("Single.driver_card_title")}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify
              icon="tabler:helmet"
              width={24}
              sx={{
                transform: dir === "rtl" ? "scaleX(-1)" : "",
              }}
            />
            <Stack>
              <Typography variant="caption">{t("driver_name")}</Typography>
              <Typography variant="body2" fontWeight="bold">
                {driver.username}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
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
        </Box>
      </CardContent>
    </Card>
  );
}

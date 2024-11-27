import Image from "next/image";
import { useTranslations } from "next-intl";

import { Stack, Button, Container, Typography } from "@mui/material";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { usecheckoutStore } from "@/contexts/checkout-store";

export default function DoneStep() {
  const t = useTranslations("Pages.Cart.Done");
  const { orderId } = usecheckoutStore();

  return (
    <Container
      sx={{
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
        minHeight: "100%",
        py: 6,
        pb: 10,
      }}
    >
      <Image
        width={250}
        height={250}
        src="/assets/icons/cart/truck.svg"
        alt="done"
      />
      <Typography variant="h4" mt={4} textAlign="center">
        {t("title")}
      </Typography>
      <Typography textAlign="center">{t("message")}</Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        mt={2}
        flexWrap="wrap"
      >
        <Button
          color="primary"
          variant="outlined"
          sx={{ flexGrow: 1, flexShrink: 0, maxWidth: "100%" }}
          href={paths.home}
        >
          {t("shopping")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ flexGrow: 1, flexShrink: 0, maxWidth: "100%" }}
          LinkComponent={RouterLink}
          href={`${paths.orders}/${orderId || ""}`}
        >
          {t("track")}
        </Button>
      </Stack>
    </Container>
  );
}

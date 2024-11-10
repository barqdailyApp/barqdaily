import Image from "next/image";
import { useTranslations } from "next-intl";

import { Box, Button, Container, Typography } from "@mui/material";

import { paths } from "@/routes/paths";

export default function EmptyView() {
  const t = useTranslations("Pages.Cart.Empty");

  return (
    <Container sx={{ placeItems: "center", py: 6, pb: 10 }}>
      <Box
        bgcolor="background.neutral"
        maxWidth="100%"
        width={250}
        height="auto"
        p={2}
        borderRadius={4}
        display="grid"
        sx={{ placeItems: "center", aspectRatio: 1 }}
      >
        <Image
          width={180}
          height={180}
          src="/assets/icons/cart/sad.svg"
          alt="done"
        />
      </Box>
      <Typography variant="h4" mt={4} textAlign="center">
        {t("title")}
      </Typography>
      <Typography textAlign="center">{t("message")}</Typography>

      <Button
        color="primary"
        variant="contained"
        sx={{ mt: 2, maxWidth: "100%" }}
        href={paths.home}
      >
        {t("shopping")}
      </Button>
    </Container>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Box, Stack, Container, Typography } from "@mui/material";

import { getCurrentLocale } from "@/utils/get-locale";

import { APP_LINKS, CONTACT_INFO } from "../config-info";

export default async function Footer() {
  const t = await getTranslations("Global.Footer");
  const { dir } = await getCurrentLocale();

  const renderContact = (
    <Box>
      <Typography
        variant="h3"
        fontWeight={500}
        letterSpacing=".02em"
        component="h2"
      >
        {t("contact_title")}
      </Typography>
      {CONTACT_INFO.map((item, index) => (
        <Typography
          dir="ltr"
          sx={
            dir === "rtl"
              ? {
                  width: { sm: "fit-content" },
                  marginInlineStart: { sm: "auto" },
                }
              : {}
          }
          key={index}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );

  const renderAppDownload = (
    <Stack spacing={1}>
      <Typography
        variant="h6"
        fontWeight={500}
        letterSpacing=".02em"
        textAlign="center"
      >
        {t("download")}
      </Typography>
      <Link href={APP_LINKS.ios} target="_blank">
        <Image
          src="/assets/images/footer/download-ios.svg"
          width={186}
          height={55}
          alt={t("download_ios")}
        />
      </Link>
      <Link href={APP_LINKS.android} target="_blank">
        <Image
          src="/assets/images/footer/download-android.svg"
          width={186}
          height={55}
          alt={t("download_android")}
        />
      </Link>
    </Stack>
  );

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: {
          xs: 2,
          md: 3,
        },
      }}
      component="footer"
    >
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          textAlign={{ xs: "center", sm: "start" }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          {renderContact}
          {renderAppDownload}
        </Stack>
      </Container>
    </Box>
  );
}

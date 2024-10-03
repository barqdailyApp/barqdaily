import RouterLink from "next/link";
import { useTranslations } from "next-intl";

import { Link, Stack, Typography } from "@mui/material";

import { useDir } from "@/routes/hooks/use-dir";

import Iconify from "@/components/iconify";

export default function SectionHeadding({
  titleName,
  href,
}: {
  titleName: string;
  href: string;
}) {
  const t = useTranslations("Pages.Home");
  const dir = useDir();

  return (
    <Stack direction="row" spacing={3} justifyContent="space-between">
      <Typography variant="h4">{t(titleName)}</Typography>
      <Link
        href={href}
        variant="h6"
        sx={{ display: "flex", alignItems: "center", gap: 0.25 }}
        component={RouterLink}
      >
        {t("action")}
        <Iconify
          icon="weui:arrow-filled"
          sx={{ transform: dir === "rtl" ? " scaleX(-1)" : "" }}
          width={24}
        />
      </Link>
    </Stack>
  );
}

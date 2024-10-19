import Link from "next/link";
import { useTranslations } from "next-intl";

import Stack from "@mui/material/Stack";
import { Box, Container, IconButton, Typography } from "@mui/material";

import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

const socials = [
  {
    name: "facebook",
    icon: "uil:facebook",
    link: "#",
  },
  {
    name: "x.com",
    icon: "pajamas:twitter",
    link: "#",
  },
  { name: "youtube", icon: "mdi:youtube", link: "#" },
  {
    name: "instagram",
    icon: "mdi:instagram",
    link: "#",
  },
];

export default function Copyrights() {
  const t = useTranslations("Global.Footer");

  return (
    <Box>
      <Container>
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          py={1}
        >
          <Typography color="text.secondary" variant="caption">
            {t("copyright")}
          </Typography>
          <Stack direction="row" spacing={0.5}>
            {socials.map((item) => (
              <IconButton
                key={item.name}
                href={item.link}
                sx={{ color: "text.disabled", p: 0.8 }}
                target="_blank"
                LinkComponent={Link}
              >
                <Iconify icon={item.icon} width={20} height={20} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

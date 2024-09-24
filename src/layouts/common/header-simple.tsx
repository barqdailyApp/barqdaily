"use client";

import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import { Container, IconButton } from "@mui/material";

import { RouterLink } from "@/routes/components";

import { useOffSetTop } from "@/hooks/use-off-set-top";

import Iconify from "@/components/iconify";

import { HEADER } from "../config-layout";
import LanguagePopover from "./language-popover";

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

export default function HeaderSimple() {
  const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar
      sx={{
        borderBottom: `solid 1px ${theme.palette.divider}`,
        transition: theme.transitions.create(["transform"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        ...(offsetTop && {
          transform: `translateY(-100%)`,
        }),
      }}
    >
      <Container>
        <Toolbar
          sx={{
            bgcolor: theme.palette.background.default,
            justifyContent: "space-between",
            minHeight: { xs: HEADER.H_SIMPLE },
          }}
        >
          <Stack direction="row" spacing={0.5}>
            {socials.map((item) => (
              <IconButton
                key={item.name}
                LinkComponent={RouterLink}
                href={item.link}
                target="_blank"
                sx={{ color: "text.disabled", p: 0.8 }}
              >
                <Iconify icon={item.icon} width={20} height={20} />
              </IconButton>
            ))}
          </Stack>

          <LanguagePopover />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

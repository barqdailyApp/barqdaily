"use client";

import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import { IconButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";

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
    <AppBar>
      <Toolbar
        sx={{
          bgcolor: theme.palette.background.default,
          justifyContent: "space-between",
          minHeight: { xs: HEADER.H_SIMPLE },
          transition: theme.transitions.create(["height", "transform"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          borderBottom: `solid 1px ${theme.palette.divider}`,
          ...(offsetTop && {
            transform: `translateY(-100%)`,
          }),
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

        <Stack direction="row" alignItems="center" spacing={1}>
          <LanguagePopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

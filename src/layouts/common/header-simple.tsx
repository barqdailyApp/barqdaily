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
import { SOCIAL_LINKS } from "../config-info";
import LanguagePopover from "./language-popover";

// ----------------------------------------------------------------------

export default function HeaderSimple() {
  const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_OFFSET);

  return (
    <AppBar
      sx={{
        bgcolor: theme.palette.background.default,
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
            justifyContent: "space-between",
            minHeight: `${HEADER.H_SIMPLE}px !important`,
          }}
        >
          <Stack direction="row" spacing={0.5}>
            {SOCIAL_LINKS.map((item) => (
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

"use client";

import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import { Box, Container, useMediaQuery } from "@mui/material";

import { useOffSetTop } from "@/hooks/use-off-set-top";

import { bgBlur } from "@/theme/css";

import Logo from "@/components/logo";

import StoreSearch from "./search";
import CartButton from "./cart-button";
import { HEADER } from "../config-layout";
import AccountPopover from "../common/account-popover";

// ----------------------------------------------------------------------

export default function StoreHeader() {
  const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_OFFSET);

  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const renderContent = (
    <>
      {!isSm && (
        <Box
          width={80}
          height={80}
          sx={{
            paddingInlineStart: 2,
            py: 2,
            "& img": {
              width: "auto",
              height: "100%",
            },
          }}
        >
          <Logo />
        </Box>
      )}

      <StoreSearch />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        flexShrink={0}
      >
        <CartButton />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        top: HEADER.H_SIMPLE,
        height: HEADER.H_MOBILE,
        borderTop: `solid 1px ${theme.palette.divider}`,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["top"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(offsetTop && {
          top: 0,
        }),
      }}
    >
      <Container sx={{ minHeight: "100%" }}>
        <Toolbar
          sx={{
            height: 1,
          }}
        >
          {renderContent}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

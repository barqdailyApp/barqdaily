"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Box, Badge, Button, Container } from "@mui/material";

import { paths } from "@/routes/paths";

import { useOffSetTop } from "@/hooks/use-off-set-top";

import { bgBlur } from "@/theme/css";
import { useAuthContext } from "@/auth/hooks";

import Logo from "@/components/logo";
import Iconify from "@/components/iconify";
import SvgColor from "@/components/svg-color";

import { HEADER } from "../config-layout";
import Searchbar from "../common/searchbar";
import AccountPopover from "../common/account-popover";

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function StoreHeader({ onOpenNav }: Props) {
  const theme = useTheme();

  const t = useTranslations();

  const { authenticated } = useAuthContext();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const router = useRouter();

  const renderContent = (
    <>
      <IconButton onClick={onOpenNav}>
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

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

      <Searchbar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        <IconButton>
          <Badge badgeContent={4} color="secondary">
            <Iconify icon="bxs:cart-alt" />
          </Badge>
        </IconButton>

        {authenticated ? (
          <AccountPopover />
        ) : (
          <Button
            variant="outlined"
            onClick={() => router.push(paths.auth.jwt.login)}
          >
            {t("Global.Label.login")}
          </Button>
        )}
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
      <Container>
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

"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, ListItemIcon, ListItemText } from "@mui/material";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { useAuthContext } from "@/auth/hooks";
import { useCartStore } from "@/contexts/cart-store";

import Iconify from "@/components/iconify";
import { varHover } from "@/components/animate";
import { useSnackbar } from "@/components/snackbar";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { useEffect, useMemo, useState } from "react";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "home",
    linkTo: paths.home,
    icon: "tabler:home",
  },
  {
    label: "favorite",
    linkTo: paths.favProducts,
    icon: "mdi:heart-outline",
  },
  {
    label: "orders",
    linkTo: paths.orders,
    icon: "mynaui:package",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const t = useTranslations();
  const { authenticated } = useAuthContext();

  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    setSearchParams(
      new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString()
    );
  }, []);

  if (authenticated) return <AccountPopoverContent />;

  const loginHref = `${paths.auth.jwt.login}?${searchParams}`;

  return (
    <Button
      variant="outlined"
      LinkComponent={RouterLink}
      href={loginHref}
      sx={{ flexShrink: 0 }}
    >
      {t("Global.Label.login")}
    </Button>
  );
}

function AccountPopoverContent() {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const popover = usePopover();
  const { enqueueSnackbar } = useSnackbar();
  const { user, logout } = useAuthContext();
  const { initCart } = useCartStore();

  const handleLogout = async () => {
    try {
      await logout();
      initCart();
      router.push(paths.home);
      popover.onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.avatar}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.phone}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              <ListItemIcon sx={{ minWidth: "20px !important" }}>
                <Iconify
                  icon={option.icon}
                  sx={{ "&": { margin: "0 !important" } }}
                />
              </ListItemIcon>
              <ListItemText>{t(option.label)}</ListItemText>
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: "fontWeightBold", color: "error.main" }}
        >
          <ListItemIcon sx={{ minWidth: "20px !important" }}>
            <Iconify
              icon="mdi:logout"
              sx={{ "&": { margin: "0 !important" } }}
            />
          </ListItemIcon>
          <ListItemText>{t("logout")}</ListItemText>
        </MenuItem>
      </CustomPopover>
    </>
  );
}

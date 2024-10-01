import { m } from "framer-motion";
import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import MenuItem from "@mui/material/MenuItem";
import { Button, Typography } from "@mui/material";

import { allLocales, LocaleType } from "@/i18n/config-locale";
import { useCurrentLocale } from "@/i18n/localization-provider";

import Iconify from "@/components/iconify";
import { varHover } from "@/components/animate";
import CustomPopover, { usePopover } from "@/components/custom-popover";

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const popover = usePopover();
  const locale = useLocale();
  const currentLocale = useCurrentLocale();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangeLang = useCallback(
    (newLocale: LocaleType) => {
      if (locale !== newLocale) {
        router.push(
          `${pathname.replace(`/${locale}`, `/${newLocale}`)}${searchParams ? `?${searchParams.toString()}` : ""}`
        );
      }
      popover.onClose();
    },
    [locale, pathname, popover, router, searchParams]
  );

  return (
    <>
      <Button
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          // width: 40,
          height: 40,
          p: 0,
          px: 2,
          ...(popover.open && {
            bgcolor: "action.selected",
          }),
        }}
        startIcon={
          <Iconify
            icon={currentLocale.icon}
            sx={{ borderRadius: 0.65, width: 20 }}
          />
        }
        endIcon={
          <Iconify
            icon="eva:chevron-down-fill"
            style={{
              transform: popover.open ? "rotate(180deg)" : "",
              transition: "0.2s",
            }}
          />
        }
      >
        <Typography>{currentLocale.label}</Typography>
      </Button>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 160 }}
      >
        {allLocales.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLocale.value}
            onClick={() => handleChangeLang(option.value)}
          >
            <Iconify
              icon={option.icon}
              sx={{ borderRadius: 0.65, width: 28 }}
            />

            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

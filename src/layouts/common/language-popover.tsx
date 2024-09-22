import { m } from "framer-motion";
import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

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
  const router = useRouter();

  const handleChangeLang = useCallback(
    (newLocale: LocaleType) => {
      if (locale !== newLocale) {
        router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
      }
      popover.onClose();
    },
    [locale, pathname, popover, router]
  );

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
          ...(popover.open && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <Iconify
          icon={currentLocale.icon}
          sx={{ borderRadius: 0.65, width: 28 }}
        />
      </IconButton>

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

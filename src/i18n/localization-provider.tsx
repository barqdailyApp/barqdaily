"use client";

import { useLocale } from "next-intl";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { LocaleType, localesSettings } from "./config-locale";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function useCurrentLocale() {
  const lang = useLocale();

  const currentLocale = localesSettings[lang as LocaleType];

  return currentLocale;
}

export default function LocalizationProvider({ children }: Props) {
  const currentLocale = useCurrentLocale();

  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={currentLocale.adapterLocale}
    >
      {children}
    </MuiLocalizationProvider>
  );
}

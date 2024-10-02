import merge from "lodash/merge";
// date fns
import { enUS as enUSAdapter, arSA as arSAAdapter } from "date-fns/locale";

// date pickers (MUI)
import { enUS as enUSDate } from "@mui/x-date-pickers/locales";
// core (MUI)
import { enUS as enUSCore, arSA as arSACore } from "@mui/material/locale";
// data grid (MUI)
import { enUS as enUSDataGrid, arSD as arSDDataGrid } from "@mui/x-data-grid";

export type LocaleType = "en" | "ar";

interface LocaleSetting {
  label: string;
  value: LocaleType;
  dir: "ltr" | "rtl";
  systemValue: any;
  adapterLocale: any;
  icon: string;
  numberFormat: {
    code: string;
    currency: string;
  };
}

export const locales: LocaleType[] = ["ar", "en"];
export const defaultLocale: LocaleType = "ar";

export const localesSettings: { [key in LocaleType]: LocaleSetting } = {
  ar: {
    label: "العربية",
    value: "ar",
    dir: "rtl",
    systemValue: merge(arSDDataGrid, arSACore),
    adapterLocale: arSAAdapter,
    icon: "flagpack:sa",
    numberFormat: {
      code: "ar",
      currency: "AED",
    },
  },
  en: {
    label: "English",
    value: "en",
    dir: "ltr",
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: "flagpack:gb-nir",
    numberFormat: {
      code: "en-US",
      currency: "USD",
    },
  },
};

export const allLocales = Object.values(localesSettings);

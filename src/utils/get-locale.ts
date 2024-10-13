"use server";

import { cookies } from "next/headers";

import { COOKIES_KEYS } from "@/config-global";
import {
  LocaleType,
  defaultLocale,
  localesSettings,
} from "@/i18n/config-locale";

export const getCurrentLocale = async () => {
  const code = cookies().get(COOKIES_KEYS.lang)?.value || defaultLocale;
  return localesSettings[code as LocaleType];
};

export const getCurrency = async () => {
  const { currency } = await getCurrentLocale();

  const formater = (
    inputValue: string | number | null,
    currencyCode = true
  ) => {
    if (!inputValue) return "";

    const number = Number(inputValue);

    const fm = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return currencyCode ? `${fm} ${currency}` : fm;
  };

  return formater;
};

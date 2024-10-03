import { useLocale } from "next-intl";

import { LocaleType, localesSettings } from "@/i18n/config-locale";

export function useDir() {
  const locale = useLocale();
  return localesSettings[locale as LocaleType].dir;
}

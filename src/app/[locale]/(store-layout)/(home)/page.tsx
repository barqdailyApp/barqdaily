import "swiper/css";
import "swiper/css/pagination";
import { getTranslations } from "next-intl/server";

import { LocaleType } from "@/i18n/config-locale";

export default async function Page() {
  return null;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LocaleType };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("Title.home"),
  };
}

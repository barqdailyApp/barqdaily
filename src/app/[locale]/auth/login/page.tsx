import { getTranslations } from "next-intl/server";

import { LocaleType } from "@/i18n/config-locale";

import { JwtLoginView } from "@/sections/auth/jwt";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return <JwtLoginView />;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LocaleType };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("Title.login"),
  };
}

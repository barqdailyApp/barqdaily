import { getTranslations } from "next-intl/server";

import { LocaleType } from "@/i18n/config-locale";

import Cart from "@/sections/cart/view/cart-view";

export default async function Page() {
  return <Cart />;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LocaleType };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("Title.cart"),
  };
}

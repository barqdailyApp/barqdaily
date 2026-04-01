import { getTranslations } from "next-intl/server";

import { LocaleType } from "@/i18n/config-locale";
import { fetchWallet } from "@/actions/wallet-actions";

import Cart from "@/sections/cart/view/cart-view";

export default async function Page() {
  const wallet = await fetchWallet();

  return (
    <Cart balance={"error" in wallet ? 0 : Number(wallet.data.balance || 0)} />
  );
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

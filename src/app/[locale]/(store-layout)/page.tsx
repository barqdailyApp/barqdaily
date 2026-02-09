import "swiper/css";
import "swiper/css/pagination";
import { getTranslations } from "next-intl/server";

import { LocaleType } from "@/i18n/config-locale";

import BrandsView from "@/sections/home/view/brands-view";
import OffersView from "@/sections/home/view/offers-view";
import BannersView from "@/sections/home/view/banners-view";
import CategoriesView from "@/sections/home/view/categories-view";
import OrderAgainView from "@/sections/home/view/order-again-view";
import CollectionsView from "@/sections/home/view/collections-view";

export default async function Page() {
  return (
    <>
        <BannersView />

        <BrandsView />

        <CollectionsView filter="upper" />

        <CategoriesView />

        <CollectionsView filter="lower" />

        <OffersView />

        <OrderAgainView />
    </>
  );
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

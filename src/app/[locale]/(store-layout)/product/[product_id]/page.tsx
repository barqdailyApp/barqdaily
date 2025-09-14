import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import { LocaleType } from "@/i18n/config-locale";
import { fetchSingleProduct } from "@/actions/products-actions";

import SingleProductView from "@/sections/products/view/single-product-view";

import { FullProduct } from "@/types/products";

interface Props {
  params: {
    product_id: string;
  };
}

export default async function Page({ params: { product_id } }: Props) {
  const product = await fetchSingleProduct(product_id);

  if ("error" in product) {
    notFound();
  }

  return <SingleProductView product={product} />;
}

export async function generateMetadata({
  params: { locale, product_id },
}: {
  params: { locale: LocaleType; product_id: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const res = await getData<FullProduct>(
    `${endpoints.products.singleProduct}/${product_id}`,
    {
      headers: {
        "Accept-Language": locale,
      },
    }
  );

  if ("error" in res) {
    return {
      title: t("Title.products"),
    };
  }
  return {
    title: `${res.data.product.product_name} | ${t("Title.default")}`,
  };
}

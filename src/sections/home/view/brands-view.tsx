import { fetchBrands } from "@/actions/products-actions";

import { Brand } from "@/types/products";

import BrandsSwiper from "../brands-swiper";

export default async function BrandsView() {
  const brandsRes = await fetchBrands();
  const brands: Brand[] = "error" in brandsRes ? [] : brandsRes;

  if (brands.length === 0) {
    return null;
  }

  return <BrandsSwiper brands={brands} />;
}

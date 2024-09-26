import "swiper/css";
import "swiper/css/pagination";

import { fetchBanars } from "@/actions/banars-actions";
import { fetchBrands } from "@/actions/products-actions";

import { HomeView } from "@/sections/home/view";

export default async function Page() {
  const banras = await fetchBanars();

  if ("error" in banras) {
    throw new Error(banras.error);
  }

  const brands = await fetchBrands();

  if ("error" in brands) {
    throw new Error(brands.error);
  }

  return <HomeView banars={banras} brands={brands} />;
}

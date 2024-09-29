import { fetchBanars } from "@/actions/banars-actions";

import BanarsSwiper from "@/sections/home/banars-swiper";

export default async function Page() {
  const banras = await fetchBanars();

  if ("error" in banras) {
    throw new Error(banras.error);
  }

  return <BanarsSwiper banars={banras} />;
}

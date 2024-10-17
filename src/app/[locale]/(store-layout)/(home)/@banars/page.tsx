import { fetchBanars } from "@/actions/banars-actions";

import BanarsSwiper from "@/sections/home/banars-swiper";

export default async function Page() {
  const banars = await fetchBanars();

  if ("error" in banars || banars.length === 0) {
    return null;
  }

  return <BanarsSwiper banars={banars} />;
}

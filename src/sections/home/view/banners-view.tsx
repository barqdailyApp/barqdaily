import { fetchBanars } from "@/actions/banars-actions";

import { Banar } from "@/types/banars";

import BanarsSwiper from "../banars-swiper";

export default async function BannersView() {
  const banarsRes = await fetchBanars();
  const banars: Banar[] = "error" in banarsRes ? [] : banarsRes;

  return <BanarsSwiper banars={banars} />;
}

import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import DailyOffers from "@/sections/home/daily-offers";

import { Offer } from "@/types/products";

export default async function Page() {
  const offers = await getData<{ data: Offer[] }>(
    `${endpoints.products.offers}?page=1&limit=4&sort=new'`
  );

  if ("error" in offers) {
    return null;
  }
  return <DailyOffers offers={offers.data?.data} />;
}

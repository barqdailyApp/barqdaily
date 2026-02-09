import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import DailyOffers from "@/sections/home/daily-offers";

import { Offer } from "@/types/products";

export default async function OffersView() {
  const offers = await getData<{ data: Offer[] }>(
    `${endpoints.products.offers}?page=1&limit=7&sort=new`
  );

  console.log("offers", offers);
  if ("error" in offers) {
    return null;
  }

  const items = offers.data.data;


  return <DailyOffers offers={items} />;
}

"use server";

import { endpoints } from "@/utils/endpoints";
import { getData } from "@/utils/crud-fetch-api";

import { Address } from "@/types/profile";

export async function fetchAddresses() {
  const res = await getData<Address[]>(endpoints.address.list);

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

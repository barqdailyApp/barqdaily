"use server";

import axiosInstance from "@/utils/axios";
import { endpoints } from "@/utils/endpoints";

import { Banar } from "@/types/banars";
import { ActionResponse } from "@/types/actions";

import { getLocale } from "./common-actions";

export async function fetchBanars(): ActionResponse<Banar[]> {
  const locale = await getLocale();

  try {
    const res = await axiosInstance.get(endpoints.banars, {
      headers: {
        "Accept-Language": locale,
      },
    });

    return res?.data;
  } catch (err: any) {
    return { error: err?.message };
  }
}

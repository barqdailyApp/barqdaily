"use server";

import axiosInstance from "@/utils/axios";
import { endpoints } from "@/utils/endpoints";

import { Banar } from "@/types/banars";
import { ActionResponse } from "@/types/actions";

export async function fetchBanars(): ActionResponse<Banar[]> {
  try {
    const res = await axiosInstance.get(endpoints.banars);

    return res?.data;
  } catch (err: any) {
    return { error: err?.message };
  }
}

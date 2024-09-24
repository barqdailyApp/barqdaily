"use server";

import { cookies } from "next/headers";

import { defaultLocale } from "@/i18n/config-locale";

export async function getLocale() {
  const locale = cookies().get("NEXT_LOCALE")?.value || defaultLocale;
  return locale;
}

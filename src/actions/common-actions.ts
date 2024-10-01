"use server";

import { cookies } from "next/headers";

import { COOKIES_KEYS } from "@/config-global";
import { defaultLocale } from "@/i18n/config-locale";

export async function getLocale() {
  const locale = cookies().get(COOKIES_KEYS.lang)?.value || defaultLocale;
  return locale;
}

export async function getSession() {
  const session = cookies().get(COOKIES_KEYS.session)?.value;
  return session;
}

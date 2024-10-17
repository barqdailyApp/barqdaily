"use server";

import { cookies } from "next/headers";

import { endpoints } from "@/utils/endpoints";
import { postData } from "@/utils/crud-fetch-api";

import { COOKIES_KEYS } from "@/config-global";

interface RegisterBody {
  phone: string;
  name: string;
}
export async function register(body: RegisterBody) {
  const res = await postData<{ expiryTime: string }, RegisterBody>(
    endpoints.auth.register,
    body
  );

  if ("error" in res) {
    return res;
  }

  cookies().set(COOKIES_KEYS.expiryTime, res.data.expiryTime, {
    expires: new Date(res.data.expiryTime),
  });
  return res.data;
}

export async function sendOtp(phone: string) {
  const res = await postData<
    { expiryTime: string },
    { username: string; role: "CLIENT"; type: "phone" }
  >(endpoints.auth.sendOtp, {
    username: phone,
    role: "CLIENT",
    type: "phone",
  });

  if ("error" in res) {
    return res;
  }

  cookies().set(COOKIES_KEYS.expiryTime, res.data.expiryTime, {
    expires: new Date(res.data.expiryTime),
  });
  return res.data;
}
export async function verifyOtp(reqBody: verifyOtpCredentials) {
  const res = await postData<verifyOtpResponse, any>(endpoints.auth.verifyOtp, {
    username: reqBody.phoneNumber,
    code: reqBody.otp,
    type: "phone",
  });

  if ("error" in res) {
    return res;
  }

  const { name, avatar, email, phone, access_token: token } = res.data;
  const user = { name, avatar, email, phone };

  cookies().set(COOKIES_KEYS.session, token);
  cookies().set(COOKIES_KEYS.user, JSON.stringify(user));
  return user;
}

export async function logUserOut() {
  cookies().delete(COOKIES_KEYS.session);
  cookies().delete(COOKIES_KEYS.user);
  cookies().delete(COOKIES_KEYS.expiryTime);
}
export type verifyOtpCredentials = {
  phoneNumber: string;
  otp: string;
};
export interface User {
  name: string;
  avatar: string;
  email: string;
  phone: string;
}
export type verifyOtpResponse = User & {
  access_token: string;
};

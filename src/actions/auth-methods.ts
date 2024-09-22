"use server";

import { cookies } from "next/headers";

import axiosInstance from "@/utils/axios";
import { endpoints } from "@/utils/endpoints";

import { COOKIES_KEYS } from "@/config-global";

export async function register(body: { phone: string; name: string }) {
  try {
    const res = await axiosInstance.post(endpoints.auth.register, body);
    cookies().set(COOKIES_KEYS.expiryTime, res.data.expiryTime, {
      expires: new Date(res.data.expiryTime),
    });
    return res.data;
  } catch (err: any) {
    return { error: err?.response?.data?.message };
  }
}

export async function sendOtp(phone: string) {
  try {
    const res = await axiosInstance.post(endpoints.auth.sendOtp, {
      username: phone,
      role: "CLIENT",
      type: "phone",
    });
    cookies().set(COOKIES_KEYS.expiryTime, res.data.expiryTime, {
      expires: new Date(res.data.expiryTime),
    });
    return res.data;
  } catch (err: any) {
    return { error: err?.response?.data?.message };
  }
}
export async function verifyOtp(reqBody: verifyOtpCredentials) {
  try {
    const res = await axiosInstance.post(endpoints.auth.verifyOtp, {
      username: reqBody.phoneNumber,
      code: reqBody.otp,
      type: "phone",
    });

    const { name, avatar, email, phone, access_token: token } = res.data.data;
    const user = { name, avatar, email, phone };

    cookies().set(COOKIES_KEYS.session, token);
    cookies().set(COOKIES_KEYS.user, JSON.stringify(user));
    return user;
  } catch (err: any) {
    return { error: err?.response?.data?.message };
  }
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
export type sendOtpCredentials = {
  type: "phone";
  username: string;
  role: "CLIENT";
};
export type sendOtpResponse = {
  expiryTime: string;
};
export type verifyOtpResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
  };
};

export interface User {
  name: string;
  avatar: string;
  email: string;
  phone: string;
}

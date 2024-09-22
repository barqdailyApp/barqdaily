import { paths } from "@/routes/paths";

// API
// ----------------------------------------------------------------------

export const {HOST_API} = process.env;
export const ASSETS_API = process.env.HOST_DOMAIN;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'

export const SESSION_PERIOD = 60 * 30 * 1_000; //  (60 seconds * 30 * (1_000 = 1s)) = 30 Minutes;

export const COOKIES_KEYS = {
  session: "session",
  user: "user",
  lang: "lang",
  expiryTime: "expiryTime",
};

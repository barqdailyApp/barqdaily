"use server";

import { redirect } from "next/navigation";

export const clientRedirect = (path: string) => {
  redirect(path);
};

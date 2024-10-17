"use client";

import { AuthGuard } from "@/auth/guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

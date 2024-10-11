"use client";

import { useTranslations } from "next-intl";

import { Alert, AlertProps } from "@mui/material";

export default function TAlert({
  children,
  ...others
}: { children: React.ReactNode } & AlertProps) {
  const t = useTranslations();

  return <Alert {...others}>{t(children)}</Alert>;
}

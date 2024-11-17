"use client";

import { useSnackbar } from "notistack";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error.message) enqueueSnackbar(error.message, { variant: "error" });
  }, [error.message]);

  return null;
}

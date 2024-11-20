"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";

export default function Error({ error }: { error: Error }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error.message) enqueueSnackbar(error.message, { variant: "error" });
  }, [enqueueSnackbar, error.message]);

  return null;
}

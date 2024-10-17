"use client";

import { Alert } from "@mui/material";

export default function Error({ error }: { error: Error }) {
  return <Alert severity="error">{error.message}</Alert>;
}

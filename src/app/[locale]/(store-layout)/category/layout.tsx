import { ReactNode } from "react";

import { Stack, Container } from "@mui/material";

export default async function Layout({
  children,
  categories,
  subcategories,
}: {
  children: ReactNode;
  categories: ReactNode;
  subcategories: ReactNode;
}) {
  return (
    <Stack spacing={2} minHeight="100%" component={Container}>
      {categories}
      {subcategories}
      {children}
    </Stack>
  );
}

import { ReactNode } from "react";

import { Stack, Container } from "@mui/material";

export default async function Layout({
  children,
  categories,
  subCategories,
  productsList,
}: {
  children: ReactNode;
  categories: ReactNode;
  subCategories: ReactNode;
  productsList: ReactNode;
}) {
  return (
    <Stack spacing={2} minHeight="100%" py={3} component={Container}>
      {categories}
      {subCategories}
      {productsList}
      {children}
    </Stack>
  );
}

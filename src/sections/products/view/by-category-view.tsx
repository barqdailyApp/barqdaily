"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { Tab, Tabs, Stack, Button, Divider, Container } from "@mui/material";

import { useQueryString } from "@/hooks/use-queryString";

import { fetchProductsBySubCategory } from "@/actions/products-actions";

import { Product, Category, SubCategory } from "@/types/products";

import ProductsSection from "../products-section";

interface Props {
  categories: Category[];
  subCategories: SubCategory[];
  initialProducts: Product[];
}

export default function ProductsByCategoryView({
  categories,
  subCategories,
  initialProducts,
}: Props) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") || categories[0].id;
  const subCategoryId =
    searchParams.get("subCategoryId") || subCategories[0]?.id;
  const { createQueryString } = useQueryString();

  const handleChangeCategory = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      createQueryString(
        [
          { name: "categoryId", value: newValue },
          { name: "subCategoryId", value: undefined },
        ],
        true
      );
    },
    [createQueryString]
  );
  const handleChangeSubCategory = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      createQueryString([{ name: "subCategoryId", value: newValue }], true);
    },
    [createQueryString]
  );
  return (
    <Stack minHeight="100%">
      <Container>
        <Tabs
          value={categoryId}
          onChange={handleChangeCategory}
          aria-label="Choose product category"
          sx={{ paddingTop: 2 }}
        >
          {categories.map((item) => (
            <Tab
              label={item.name}
              key={item.id}
              value={item.id}
              sx={{ px: 1 }}
            />
          ))}
        </Tabs>
        <Divider />
        <Tabs
          aria-label="Choose product sub category"
          value={subCategoryId}
          sx={{ paddingTop: 2 }}
          TabIndicatorProps={{
            sx: {
              display: "none",
            },
          }}
        >
          {subCategories.map((item) => (
            <Button
              variant={item.id === subCategoryId ? "contained" : "outlined"}
              color={item.id === subCategoryId ? "warning" : "inherit"}
              onClick={(e) => handleChangeSubCategory(e, item.id)}
              key={item.id}
              value={item.id}
              sx={{ mx: 1 }}
            >
              {item.name}
            </Button>
          ))}
        </Tabs>
      </Container>

      <ProductsSection
        initialProducts={initialProducts}
        getProductsFunction={() => fetchProductsBySubCategory(subCategoryId)}
        isLoading={false}
      />
    </Stack>
  );
}

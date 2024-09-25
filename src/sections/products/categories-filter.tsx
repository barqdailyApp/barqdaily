"use client";

import { useState, useEffect, useCallback } from "react";

import { Tab, Tabs } from "@mui/material";

import { useQueryString } from "@/hooks/use-queryString";

import { Category } from "@/types/products";

interface Props {
  categories: Category[];
  initialCategoryId: string | undefined;
}

export default function CategoriesFilter({
  categories,
  initialCategoryId,
}: Props) {
  const [categoryId, setCategoryId] = useState(initialCategoryId);

  const { createQueryString } = useQueryString();

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCategoryId(newValue);
      createQueryString([{ name: "categoryId", value: newValue }], true);
    },
    [createQueryString]
  );

  useEffect(() => {
    if (
      !initialCategoryId ||
      !categories.find((item) => item.id === categoryId)
    ) {
      handleChange({} as React.SyntheticEvent, categories[0].id);
    }
  }, [handleChange, categories, categoryId, initialCategoryId]);

  return (
    <Tabs
      value={categoryId}
      onChange={handleChange}
      aria-label="Choose product category"
    >
      {categories.map((item) => (
        <Tab label={item.name} key={item.id} value={item.id} sx={{ px: 1 }} />
      ))}
    </Tabs>
  );
}

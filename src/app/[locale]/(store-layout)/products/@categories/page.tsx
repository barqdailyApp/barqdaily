import { fetchCategories } from "@/actions/products-actions";

import CategoriesFilter from "@/sections/products/categories-filter";

interface Props {
  searchParams: { categoryId: string | undefined };
}

export default async function Page({ searchParams: { categoryId } }: Props) {
  const categories = await fetchCategories();

  if ("error" in categories) {
    throw new Error(categories.error);
  }
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <CategoriesFilter categories={categories} initialCategoryId={categoryId} />
  );
}

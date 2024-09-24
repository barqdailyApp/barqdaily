import {
  fetchCategories,
  fetchSubCategories,
  fetchProductsBySubCategory,
} from "@/actions/products-actions";

import ProductsByCategoryView from "@/sections/products/view/by-category-view";

type SearchParams = {
  [key in "categoryId" | "subCategoryId"]: string | undefined;
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const categories = await fetchCategories();

  if ("error" in categories) {
    throw new Error(categories.error);
  }

  const categoryId = searchParams.categoryId || categories[2]?.id;

  const subCategories = await fetchSubCategories(categoryId);

  if ("error" in subCategories) {
    throw new Error(subCategories.error);
  }

  const subCategoryId = searchParams.subCategoryId || subCategories[0]?.id;

  const products = await fetchProductsBySubCategory(subCategoryId);

  if ("error" in products) {
    throw new Error(products.error);
  }

  return (
    <ProductsByCategoryView
      categories={categories}
      subCategories={subCategories}
      initialProducts={products.items}
    />
  );
}

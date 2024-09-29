import { fetchBrands, fetchCategories } from "@/actions/products-actions";

import BrandsSwiper from "@/sections/home/brands-swiper";
import CategoriesList from "@/sections/home/categories-list";

export default async function Page() {
  const brands = await fetchBrands();

  if ("error" in brands) {
    throw new Error(brands.error);
  }

  const categories = await fetchCategories();

  if ("error" in categories) {
    throw new Error(categories.error);
  }

  return (
    <>
      <BrandsSwiper brands={brands} />
      <CategoriesList categories={categories} />
    </>
  );
}

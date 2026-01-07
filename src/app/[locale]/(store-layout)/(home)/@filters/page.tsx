import { fetchBrands, fetchCategoryGroups } from "@/actions/products-actions";

import BrandsSwiper from "@/sections/home/brands-swiper";
import CategoryGroupsList from "@/sections/home/category-groups-list";

import { Brand, CategoryGroup } from "@/types/products";

export default async function Page() {
  const brandsRes = await fetchBrands();
  const brands: Brand[] = "error" in brandsRes ? [] : brandsRes;

  const categoryGroups = await fetchCategoryGroups();
  const groups: CategoryGroup[] =
    "error" in categoryGroups ? [] : categoryGroups.section_categories;

  return (
    <>
      {brands.length > 0 && <BrandsSwiper brands={brands} />}
      {groups.length > 0 && <CategoryGroupsList groups={groups} />}
    </>
  );
}

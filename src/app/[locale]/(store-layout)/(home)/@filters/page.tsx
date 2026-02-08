import {
  fetchBrands,
  fetchCollections,
  fetchCategoryGroups,
} from "@/actions/products-actions";

import BrandsSwiper from "@/sections/home/brands-swiper";
import CollectionsList from "@/sections/home/collections-list";
import CategoryGroupsList from "@/sections/home/category-groups-list";

import { Brand, CategoryGroup, CollectionWithProducts } from "@/types/products";

export default async function Page() {
  const brandsRes = await fetchBrands();
  const brands: Brand[] = "error" in brandsRes ? [] : brandsRes;

  const categoryGroups = await fetchCategoryGroups();
  const groups: CategoryGroup[] =
    "error" in categoryGroups ? [] : categoryGroups.section_categories;

  const collectionsRes = await fetchCollections();
  const collections: CollectionWithProducts[] =
    "error" in collectionsRes ? [] : collectionsRes;

  const upperCollections = collections.filter(
    (item) => item.collection.in_header
  );
  const lowerCollections = collections.filter(
    (item) => !item.collection.in_header
  );

  return (
    <>
      {brands.length > 0 && <BrandsSwiper brands={brands} />}
      {upperCollections.length > 0 && (
        <CollectionsList collections={upperCollections} />
      )}
      {groups.length > 0 && <CategoryGroupsList groups={groups} />}
      {lowerCollections.length > 0 && (
        <CollectionsList collections={lowerCollections} />
      )}
    </>
  );
}

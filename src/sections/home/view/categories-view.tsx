import { fetchCategoryGroups } from "@/actions/products-actions";

import { CategoryGroup } from "@/types/products";

import CategoryGroupsList from "../category-groups-list";

export default async function CategoriesView() {
  const categoryGroups = await fetchCategoryGroups();
  const groups: CategoryGroup[] =
    "error" in categoryGroups ? [] : categoryGroups.section_categories;

  return <CategoryGroupsList groups={groups} />;
}

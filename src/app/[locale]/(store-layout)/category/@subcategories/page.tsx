import TAlert from "@/CustomSharedComponents/t-alert";
import { fetchSubCategories } from "@/actions/products-actions";

import SubCategoriesFilter from "@/sections/products/subCategories-filter";
import SubCategoriesLoading from "@/sections/products/loading/subCategories-loading";

interface Props {
  searchParams: {
    categoryId: string | undefined;
    subCategoryId: string | undefined;
  };
}

export default async function Page({
  searchParams: { categoryId, subCategoryId },
}: Props) {
  if (!categoryId) {
    return <SubCategoriesLoading />;
  }

  const subCategories = await fetchSubCategories(categoryId);
  if ("error" in subCategories) {
    throw new Error(subCategories.error);
  }

  if (subCategories.length === 0) {
    return (
      <TAlert severity="error">Global.Error.no_subcategories_found</TAlert>
    );
  }

  return (
    <SubCategoriesFilter
      subCategories={subCategories}
      initialSubCategoryId={subCategoryId}
    />
  );
}

import { getTranslations } from "next-intl/server";

import { Alert } from "@mui/material";

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
  const t = await getTranslations();

  if (!categoryId) {
    return <SubCategoriesLoading />;
  }

  const subCategories = await fetchSubCategories(categoryId);
  if ("error" in subCategories) {
    throw new Error(subCategories.error);
  }

  if (subCategories.length === 0) {
    return (
      <Alert severity="error">{t("Global.Error.no_subcategories_found")}</Alert>
    );
  }

  return (
    <SubCategoriesFilter
      subCategories={subCategories}
      initialSubCategoryId={subCategoryId}
    />
  );
}

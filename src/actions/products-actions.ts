"use server";

import axiosInstance from "@/utils/axios";
import { endpoints } from "@/utils/endpoints";

import { ActionResponse } from "@/types/actions";
import {
  Brand,
  Product,
  Category,
  SubCategory,
  FullProduct,
} from "@/types/products";

import { getLocale } from "./common-actions";

export async function fetchCategories(): ActionResponse<Category[]> {
  const locale = await getLocale();

  try {
    const sectionRes = await axiosInstance.get(endpoints.products.sections, {
      headers: {
        "Accept-Language": locale,
      },
    });

    const sectionId = sectionRes?.data[0]?.id;

    const categoriesRes = await axiosInstance.get(
      endpoints.products.categories(sectionId),
      {
        params: { all: false },
        headers: {
          "Accept-Language": locale,
        },
      }
    );

    return categoriesRes?.data;
  } catch (err: any) {
    return { error: err?.message };
  }
}

export async function fetchSubCategories(
  categoryId: string
): ActionResponse<SubCategory[]> {
  const locale = await getLocale();

  try {
    const res = await axiosInstance.get(
      endpoints.products.subCategories(categoryId),
      {
        params: { all: false },
        headers: {
          "Accept-Language": locale,
        },
      }
    );

    return res?.data;
  } catch (err: any) {
    return { error: err?.message };
  }
}

export async function fetchProductsBySubCategory(
  subCategoryId: string,
  page = 1
): ActionResponse<{ items: Product[]; pagesCount: number }> {
  const locale = await getLocale();
  try {
    if (!subCategoryId) throw new Error("subCategoryId is required");
    const res = await axiosInstance.get(endpoints.products.products, {
      params: {
        category_sub_category_id: subCategoryId,
        page,
        limit: 10,
      },
      headers: {
        "Accept-Language": locale,
      },
    });

    return {
      items: res?.data?.data,
      pagesCount: Math.ceil((res?.data?.meta?.itemCount || 0) / 10),
    };
  } catch (err: any) {
    return { error: err?.message };
  }
}

export async function fetchProductsByBrand(
  brandId: string,
  page = 1
): ActionResponse<{ items: Product[]; pagesCount: number }> {
  const locale = await getLocale();
  try {
    const res = await axiosInstance.get(endpoints.products.products, {
      params: {
        brand_id: brandId,
        page,
        limit: 10,
      },
      headers: {
        "Accept-Language": locale,
      },
    });

    return {
      items: res?.data?.data,
      pagesCount: Math.ceil((res?.data?.meta?.itemCount || 0) / 10),
    };
  } catch (err: any) {
    return { error: err?.message };
  }
}

export async function fetchSingleProduct(
  productId: string
): ActionResponse<FullProduct> {
  const locale = await getLocale();

  try {
    const res = await axiosInstance.get(
      `${endpoints.products.singleProduct}/${productId}`,
      {
        headers: {
          "Accept-Language": locale,
        },
      }
    );

    return res?.data;
  } catch (err: any) {
    return { error: err?.message };
  }
}

export async function fetchBrands(): ActionResponse<Brand[]> {
  const locale = await getLocale();

  try {
    const res = await axiosInstance.get(endpoints.products.brands, {
      headers: {
        "Accept-Language": locale,
      },
    });

    return res?.data;
  } catch (err: any) {
    return { error: err?.message };
  }
}

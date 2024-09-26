"use server";

import axiosInstance from "@/utils/axios";
import { endpoints } from "@/utils/endpoints";

import { ActionResponse } from "@/types/actions";
import { Product, Category, SubCategory, FullProduct } from "@/types/products";

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
  subCategoryId: string
): ActionResponse<{ items: Product[]; total: number }> {
  const locale = await getLocale();
  try {
    if (!subCategoryId) throw new Error("subCategoryId is required");
    const res = await axiosInstance.get(endpoints.products.products, {
      params: {
        category_sub_category_id: subCategoryId,
        page: 1,
        limit: 15,
      },
      headers: {
        "Accept-Language": locale,
      },
    });

    return {
      items: res?.data?.data,
      total: res?.data?.meta?.itemCount,
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

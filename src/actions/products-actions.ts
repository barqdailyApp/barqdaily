"use server";

import axiosInstance from "@/utils/axios";
import { endpoints } from "@/utils/endpoints";

import { Product, Category, SubCategory } from "@/types/products";

import { getLocale } from "./common-actions";

export async function fetchCategories(): Promise<
  Category[] | { error: string }
> {
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
): Promise<SubCategory[] | { error: string }> {
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
): Promise<{ items: Product[]; total: number } | { error: string }> {
  const locale = await getLocale();

  try {
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

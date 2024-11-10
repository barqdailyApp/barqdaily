"use server";

import { cookies } from "next/headers";

import { endpoints } from "@/utils/endpoints";
import { getData, postData } from "@/utils/crud-fetch-api";

import { COOKIES_KEYS } from "@/config-global";

import {
  Brand,
  Offer,
  Product,
  Section,
  Category,
  SubCategory,
  FullProduct,
} from "@/types/products";

export async function fetchSections() {
  const sectionRes = await getData<Section[]>(endpoints.products.sections);
  if ("error" in sectionRes) {
    return sectionRes;
  }
  return sectionRes.data;
}

export async function fetchCategories() {
  const sectionRes = await fetchSections();
  if ("error" in sectionRes) {
    return sectionRes;
  }

  const sectionId = sectionRes[0]?.id;
  const categoriesRes = await getData<Category[]>(
    `${endpoints.products.categories(sectionId)}?all=false`
  );
  if ("error" in categoriesRes) {
    return categoriesRes;
  }
  return categoriesRes.data;
}

export async function fetchSubCategories(categoryId: string) {
  const res = await getData<SubCategory[]>(
    `${endpoints.products.subCategories(categoryId)}?all=false`
  );

  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export async function fetchProductsBySubCategory(
  subCategoryId: string,
  page = 1
) {
  if (!subCategoryId) throw new Error("subCategoryId is required");
  const searchParams = new URLSearchParams({
    category_sub_category_id: subCategoryId,
    page: String(page),
    limit: String(10),
  });

  const res = await getData<{ data: Product[]; meta: { itemCount: number } }>(
    `${endpoints.products.products}?${searchParams.toString()}`
  );

  if ("error" in res) {
    return res;
  }
  return {
    items: res?.data?.data,
    pagesCount: Math.ceil((res?.data?.meta?.itemCount || 0) / 10),
  };
}

export async function fetchProductsByBrand(brandId: string, page = 1) {
  const searchParams = new URLSearchParams({
    brand_id: brandId,
    page: String(page),
    limit: String(10),
  });
  const res = await getData<{ data: Product[]; meta: { itemCount: number } }>(
    `${endpoints.products.products}?${searchParams.toString()}`
  );

  if ("error" in res) {
    return res;
  }
  return {
    items: res?.data?.data,
    pagesCount: Math.ceil((res?.data?.meta?.itemCount || 0) / 10),
  };
}

export async function fetchOffers(page = 1) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(10),
  });
  const res = await getData<{ data: Offer[]; meta: { itemCount: number } }>(
    `${endpoints.products.offers}?${searchParams.toString()}`
  );

  if ("error" in res) {
    return res;
  }
  return {
    items: res?.data?.data,
    pagesCount: Math.ceil((res?.data?.meta?.itemCount || 0) / 10),
  };
}

export async function fetchSingleProduct(productId: string) {
  const user = JSON.parse(cookies().get(COOKIES_KEYS.user)?.value || "");

  const res = await getData<FullProduct>(
    `${endpoints.products.singleProduct}/${productId}?user_id=${user.id || ""}`
  );
  if ("error" in res) {
    return res;
  }

  return res?.data;
}

export async function fetchBrands() {
  const res = await getData<Brand[]>(endpoints.products.brands);
  if ("error" in res) {
    return res;
  }
  return res?.data;
}

export async function searchProducts(search: string) {
  const searchParams = new URLSearchParams({
    product_name: search,
    page: String(1),
    limit: String(10),
  });
  const res = await getData<{ data: Product[]; meta: { itemCount: number } }>(
    `${endpoints.products.products}?${searchParams.toString()}`
  );

  if ("error" in res) {
    return res;
  }

  return res?.data?.data;
}

export async function toggleFavorite({
  productId,
  sectionId,
}: {
  productId: string;
  sectionId: string;
}) {
  const res = await postData<any, {}>(
    endpoints.products.favorite({ productId, sectionId }),
    {}
  );

  if ("error" in res) {
    return res;
  }

  return res;
}

import { fetchCollections } from "@/actions/products-actions";

import CollectionsList from "@/sections/home/collections-list";

import { CollectionWithProducts } from "@/types/products";

export default async function Page() {
  const collectionsRes = await fetchCollections();
  const collections: CollectionWithProducts[] =
    "error" in collectionsRes ? [] : collectionsRes;

  if (collections.length === 0) {
    return null;
  }

  return <CollectionsList collections={collections} />;
}


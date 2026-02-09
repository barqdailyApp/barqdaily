import { fetchCollections } from "@/actions/products-actions";

import { CollectionWithProducts } from "@/types/products";

import CollectionsList from "../collections-list";

export default async function CollectionsView({
  filter,
}: {
  filter: "upper" | "lower" | "both";
}) {
  const collectionsRes = await fetchCollections();
  const collections: CollectionWithProducts[] =
    "error" in collectionsRes ? [] : collectionsRes;

  const filteredCollections = collections.filter((item) => {
    if (filter === "both") return true;

    if (filter === "upper") return item.collection.in_header;

    return !item.collection.in_header;
  });

  return (
    <CollectionsList collections={filteredCollections} />
  );
}

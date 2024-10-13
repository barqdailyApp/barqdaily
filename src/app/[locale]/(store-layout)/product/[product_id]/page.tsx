import { fetchSingleProduct } from "@/actions/products-actions";

import SingleProductView from "@/sections/products/view/single-product-view";

interface Props {
  params: {
    product_id: string;
  };
}

export default async function Page({ params: { product_id } }: Props) {
  const product = await fetchSingleProduct(product_id);

  if ("error" in product) {
    console.log(product.error);
    throw new Error(product.error);
  }

  return <SingleProductView product={product} />;
}

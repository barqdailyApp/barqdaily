import { fetchSingleProduct } from "@/actions/products-actions";

import ProductDialogView from "@/sections/products/product-dialog-view";

interface Props {
  params: {
    product_id: string;
  };
}

export default async function Page({ params: { product_id } }: Props) {
  const product = await fetchSingleProduct(product_id);

  if ("error" in product) {
    throw new Error(product.error);
  }

  return <ProductDialogView product={product} />;
}

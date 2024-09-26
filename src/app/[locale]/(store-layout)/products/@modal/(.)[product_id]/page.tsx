import ProductDialogView from "@/sections/products/product-dialog-view";

interface Props {
  params: {
    product_id: string;
  };
}

export default async function Page({ params: { product_id } }: Props) {
  return <ProductDialogView productId={product_id} />;
}

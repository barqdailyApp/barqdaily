import { useState, useEffect, useCallback } from "react";

import { Grid, Container } from "@mui/material";

import { ProductCard } from "@/CustomSharedComponents/product/product-card";

import { LoadingScreen } from "@/components/loading-screen";

import { Product } from "@/types/products";
import ProductDialog from "@/CustomSharedComponents/product/product-dialog";

interface Props {
  isLoading: boolean;
  initialProducts: Product[];
  getProductsFunction: () => Promise<
    { items: Product[]; total: number } | { error: string }
  >;
}

export default function ProductsSection({
  isLoading,
  initialProducts,
  getProductsFunction,
}: Props) {
  const [products, setProducts] = useState(initialProducts);
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const [choosenProduct, setChoosenProduct] = useState<Product | null>(null);

  if (isLoading) return <LoadingScreen sx={{ flexGrow: 1 }} />;

  return (
    <Container>
      <Grid container spacing={3} py={3}>
        {products.map((item) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            key={item.product_id}
            sx={{ display: "grid", alignItems: "stretch" }}
          >
            <ProductCard
              product={item}
              onClick={() => setChoosenProduct(item)}
            />
          </Grid>
        ))}
      </Grid>
      {choosenProduct ? (
        <ProductDialog
          product={choosenProduct}
          open={true}
          onClose={() => setChoosenProduct(null)}
        />
      ) : null}
    </Container>
  );
}

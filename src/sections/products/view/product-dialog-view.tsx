"use client";

import Image from "next/image";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  LinearProgress,
  DialogContentText,
} from "@mui/material";

import { fCurrency } from "@/utils/format-number";

import { fetchSingleProduct } from "@/actions/products-actions";
import IncrementerButton from "@/CustomSharedComponents/product/incrementer-button";

import Iconify from "@/components/iconify";

import { FullProduct } from "@/types/products";

interface Props {
  productId: string;
}

export default function ProductDialogView({ productId }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState<FullProduct>();

  useEffect(() => {
    if (product && product.product.product_id === productId) {
      return;
    }
    (async () => {
      const res = await fetchSingleProduct(productId);

      if ("error" in res) {
        enqueueSnackbar(res.error, { variant: "error" });
        router.back();
        return;
      }
      setProduct(res);
    })();
  }, [enqueueSnackbar, product, productId, router]);

  return (
    <Dialog open onClose={() => router.back()} maxWidth="xs" fullWidth>
      <DialogTitle>
        <IconButton onClick={() => router.back()}>
          <Iconify icon="heroicons:x-mark-16-solid" />
        </IconButton>
      </DialogTitle>
      {product ? (
        <ProductDialogContent product={product} />
      ) : (
        <Box
          sx={{
            px: 5,
            width: 1,
            flexGrow: 1,
            minHeight: "min(30rem, 80vh)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
        </Box>
      )}
    </Dialog>
  );
}

function ProductDialogContent({
  product: { product, product_measurements },
}: {
  product: FullProduct;
}) {
  const t = useTranslations("Pages.Home.Product");
  const [quantity, setQuantity] = useState(0);

  const renderImage = (
    <Image
      src={product.product_logo}
      alt={product.product_name}
      width={200}
      height={200}
      style={{
        objectFit: "contain",
        textAlign: "center",
        display: "block",
        marginInline: "auto",
        borderRadius: 10,
      }}
    />
  );

  const renderContent = (
    <DialogContent sx={{ height: "auto", padding: 4 }}>
      {renderImage}
      <Typography variant="h4" component="p" pt={2}>
        {product.product_name}
      </Typography>
      <Typography
        variant="h5"
        fontWeight={500}
        color="primary"
        gutterBottom
        component="p"
        suppressHydrationWarning
      >
        {fCurrency(
          product_measurements[0].product_category_price.product_price
        )}
      </Typography>
      <Typography fontWeight={700} component="p">
        {t("description")}
      </Typography>
      <DialogContentText>{product.product_description}</DialogContentText>
    </DialogContent>
  );

  const renderActions = (
    <DialogActions>
      <Button variant="outlined">
        <Iconify icon="ph:heart-bold" />
      </Button>

      {quantity === 0 ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="bxs:cart-alt" />}
          onClick={() =>
            setQuantity(product_measurements[0].min_order_quantity)
          }
          sx={{ flexGrow: 1 }}
        >
          {t("add_to_cart")}
        </Button>
      ) : (
        <IncrementerButton
          onIncrease={() => setQuantity((prev) => prev + 1)}
          onDecrease={() =>
            setQuantity((prev) =>
              prev > product_measurements[0].min_order_quantity ? prev - 1 : 0
            )
          }
          sx={{ flexGrow: 1, position: "relative" }}
          quantity={quantity}
          disabledIncrease={
            quantity >= product_measurements[0].max_order_quantity
          }
          min={product_measurements[0].min_order_quantity}
        />
      )}
    </DialogActions>
  );

  return (
    <>
      {renderContent}

      {renderActions}
    </>
  );
}

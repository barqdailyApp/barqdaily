"use client";

import Image from "next/image";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import {
  Box,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  LinearProgress,
  DialogContentText,
} from "@mui/material";

import { useCurrency } from "@/utils/format-number";

import { fetchSingleProduct } from "@/actions/products-actions";

import Iconify from "@/components/iconify";

import IncrementerButton from "@/sections/products/incrementer-button";

import { FullProduct, ProductMeasurement } from "@/types/products";

import ProductFavButton from "../fav-button";

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
  const t = useTranslations();
  const currency = useCurrency();

  const measurement =
    product_measurements.find((item) => item.is_main_unit) ||
    ({} as ProductMeasurement);
  const offerPrice = measurement.offer?.offer_price;
  const originalPrice = measurement.product_category_price.product_price;
  const finalPrice = offerPrice ?? originalPrice;

  const maxQuantity = Math.min(
    measurement.warehouse_quantity,
    measurement.max_order_quantity,
    ...(measurement.offer?.quantity ? [measurement.offer?.quantity] : [])
  );

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
        color="primary"
        gutterBottom
        component="p"
        suppressHydrationWarning
      >
        {offerPrice && (
          <Typography component="del" color="text.disabled">
            {currency(originalPrice, false)}
          </Typography>
        )}{" "}
        {currency(finalPrice)}
      </Typography>
      <Typography fontWeight={700} component="p">
        {t("Pages.Home.Product.description")}
      </Typography>
      <DialogContentText>{product.product_description}</DialogContentText>
    </DialogContent>
  );

  const renderActions = (
    <DialogActions>
      <ProductFavButton
        isFav={product.product_is_fav}
        productId={product.product_id}
        sectionId={product.section_id}
        sx={{ alignSelf: "stretch" }}
      />

      <IncrementerButton
        product_id={product.product_id}
        product_price_id={
          measurement.product_category_price.product_category_price_id
        }
        min_order_quantity={measurement.min_order_quantity}
        max_order_quantity={maxQuantity}
        addButtonProps={{
          sx: { flexGrow: 1 },
        }}
        sx={{ flexGrow: 1 }}
      />
    </DialogActions>
  );

  return (
    <>
      {renderContent}

      {renderActions}
    </>
  );
}

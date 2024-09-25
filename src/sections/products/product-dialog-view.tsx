"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { paths } from "@/routes/paths";

import { fCurrency } from "@/utils/format-number";

import IncrementerButton from "@/CustomSharedComponents/product/incrementer-button";

import Iconify from "@/components/iconify";

import { FullProduct } from "@/types/products";

interface Props {
  product: FullProduct;
}

export default function ProductDialogView({
  product: { product, product_measurements },
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const onClose = useCallback(() => {
    setOpen(false);
    router.push(`${paths.products}?${searchParams.toString()}`);
  }, [router, searchParams]);

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
      <DialogContentText>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
        debitis aliquid, officiis alias cum sunt nisi autem officia asperiores
        beatae est facilis vel repellendus molestiae quasi laboriosam
        laudantium, dignissimos possimus.
      </DialogContentText>
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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <IconButton onClick={onClose}>
          <Iconify icon="heroicons:x-mark-16-solid" />
        </IconButton>
      </DialogTitle>

      {renderContent}

      {renderActions}
    </Dialog>
  );
}

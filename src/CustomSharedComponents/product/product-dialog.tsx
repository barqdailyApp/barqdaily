"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

import {
  Button,
  Dialog,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import { fCurrency } from "@/utils/format-number";

import Iconify from "@/components/iconify";

import { Product } from "@/types/products";

import IncrementerButton from "./incrementer-button";

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export default function ProductDialog({ product, open, onClose }: Props) {
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
        {fCurrency(product.product_price)}
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
          onClick={() => setQuantity(product.min_order_quantity)}
          sx={{ flexGrow: 1 }}
        >
          {t("add_to_cart")}
        </Button>
      ) : (
        <IncrementerButton
          onIncrease={() => setQuantity((prev) => prev + 1)}
          onDecrease={() =>
            setQuantity((prev) =>
              prev > product.min_order_quantity ? prev - 1 : 0
            )
          }
          sx={{ flexGrow: 1, position: "relative" }}
          quantity={quantity}
          disabledIncrease={quantity >= product.max_order_quantity}
          min={product.min_order_quantity}
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

import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { useState, forwardRef, useCallback } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import Stack, { StackProps } from "@mui/material/Stack";
import { Box, ButtonProps, useMediaQuery } from "@mui/material";

import { useAuthContext } from "@/auth/hooks";
import { useCartStore } from "@/contexts/cart-store";
import { useNoGuestStore } from "@/contexts/no-guest";
import {
  addProductToCart,
  removeCartProduct,
  updateCartProduct,
} from "@/actions/cart-actions";

import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

interface Props extends StackProps {
  product_id: string;
  product_price_id?: string;
  min_order_quantity: number;
  max_order_quantity: number;
  addButtonProps?: ButtonProps;
}

const IncrementerButton = forwardRef<HTMLDivElement, Props>(
  (
    {
      product_id,
      product_price_id,
      min_order_quantity,
      max_order_quantity,
      addButtonProps,
      sx,
      ...other
    },
    ref
  ) => {
    const t = useTranslations();
    const { enqueueSnackbar } = useSnackbar();
    const { authenticated } = useAuthContext();
    const { setOpen } = useNoGuestStore();
    const isMd = useMediaQuery("(min-width:450px)");
    const { products, setProduct, removeProduct } = useCartStore();
    const [loading, setLoading] = useState(false);

    const product = products.find((item) => item.product_id === product_id);
    const quantity = product?.quantity || 0;

    const handleAdd = useCallback(() => {
      if (!product_price_id) return;

      (async () => {
        setLoading(true);
        const res = await addProductToCart(product_price_id);

        if ("error" in res) {
          enqueueSnackbar(res.error, { variant: "error" });
        } else {
          setProduct(res);
        }
        setLoading(false);
      })();
    }, [enqueueSnackbar, product_price_id, setLoading, setProduct]);

    const handleRemove = useCallback(() => {
      if (!product) return;
      (async () => {
        setLoading(true);
        const res = await removeCartProduct(product.id);

        if ("error" in res) {
          enqueueSnackbar(res.error, { variant: "error" });
        } else {
          removeProduct(product.id);
        }
        setLoading(false);
      })();
    }, [enqueueSnackbar, product, removeProduct, setLoading]);

    const handleIncrease = useCallback(() => {
      if (!product) return;
      (async () => {
        setLoading(true);
        const res = await updateCartProduct(product.id, true);

        if ("error" in res) {
          enqueueSnackbar(res.error, { variant: "error" });
        } else {
          setProduct(res);
        }
        setLoading(false);
      })();
    }, [enqueueSnackbar, product, setLoading, setProduct]);

    const handleDecrease = useCallback(() => {
      if (!product) return;
      (async () => {
        setLoading(true);
        const res = await updateCartProduct(product.id, false);

        if ("error" in res) {
          enqueueSnackbar(res.error, { variant: "error" });
        } else {
          setProduct(res);
        }
        setLoading(false);
      })();
    }, [enqueueSnackbar, product, setLoading, setProduct]);

    if (!product && product_price_id)
      return (
        <LoadingButton
          variant="contained"
          color="primary"
          startIcon={isMd && <Iconify icon="bxs:cart-alt" />}
          onClick={() => (!authenticated ? setOpen(true) : handleAdd())}
          {...addButtonProps}
          loading={loading}
        >
          {isMd ? (
            t("Pages.Home.Product.add_to_cart")
          ) : (
            <Iconify icon="fluent-emoji-high-contrast:plus" />
          )}
        </LoadingButton>
      );

    return (
      <Stack
        ref={ref}
        flexShrink={0}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 0.5,
          width: 88,
          borderRadius: 1,
          typography: "subtitle2",
          ...sx,
        }}
        {...other}
      >
        <LoadingButton
          size="small"
          variant="contained"
          color="primary"
          onClick={() =>
            quantity > min_order_quantity ? handleDecrease() : handleRemove()
          }
          sx={{ p: 1.25, minWidth: "fit-content" }}
          loading={loading}
        >
          <Iconify
            icon={
              quantity > min_order_quantity ? "eva:minus-fill" : "mage:trash"
            }
          />
        </LoadingButton>

        <Box px={1} mx={1}>
          {quantity}
        </Box>

        <LoadingButton
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleIncrease()}
          disabled={quantity >= max_order_quantity}
          sx={{ p: 1.25, minWidth: "fit-content" }}
          loading={loading}
        >
          <Iconify icon="mingcute:add-line" />
        </LoadingButton>
      </Stack>
    );
  }
);

export default IncrementerButton;

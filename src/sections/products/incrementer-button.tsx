import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { forwardRef, useCallback } from "react";

import { Box, ButtonProps } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack, { StackProps } from "@mui/material/Stack";

import { useCartStore } from "@/contexts/cart-store";
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

    const { loading, setLoading, products, setProduct, removeProduct } =
      useCartStore();

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
          startIcon={<Iconify icon="bxs:cart-alt" />}
          onClick={() => handleAdd()}
          {...addButtonProps}
          loading={loading}
        >
          {t("Pages.Home.Product.add_to_cart")}
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

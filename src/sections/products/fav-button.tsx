import { useSnackbar } from "notistack";
import { useState, useCallback } from "react";

import { ButtonProps } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { toggleFavorite } from "@/actions/products-actions";

import Iconify from "@/components/iconify";

export default function ProductFavButton({
  isFav,
  productId,
  sectionId,
  ...other
}: { isFav: boolean; productId: string; sectionId: string } & ButtonProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [favState, setFavState] = useState(isFav);
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(() => {
    if (loading) return;

    (async () => {
      setLoading(true);
      const res = await toggleFavorite({ productId, sectionId });

      if ("error" in res) {
        setFavState((prev) => !prev);
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        setFavState((prev) => !prev);
      }
      setLoading(false);
    })();
  }, [enqueueSnackbar, loading, productId, sectionId]);

  return (
    <LoadingButton
      variant="outlined"
      color={favState ? "error" : "inherit"}
      {...other}
      onClick={() => onClick()}
      loading={loading}
    >
      <Iconify
        icon={favState ? "si:heart-fill" : "si:heart-line"}
        sx={{ color: favState ? "error.main" : "inherit" }}
      />
    </LoadingButton>
  );
}

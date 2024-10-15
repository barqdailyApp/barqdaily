"use client";

import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";

import {
  Box,
  Button,
  TextField,
  Autocomplete,
  LinearProgress,
} from "@mui/material";

import { paths } from "@/routes/paths";

import { useBoolean } from "@/hooks/use-boolean";

import { invalidateCaching } from "@/actions/cache-invalidation";
import { cancelShipment, fetchCancelReasons } from "@/actions/order-actions";

import { ConfirmDialog } from "@/components/custom-dialog";

import { CancelReason } from "@/types/order";

export default function CancelButton({ shipmentId }: { shipmentId: string }) {
  const t = useTranslations("Pages.Orders.Single.Cancel");
  const isOpen = useBoolean();
  const [reasons, setReasons] = useState<CancelReason[]>([]);
  const [reasonId, setReasonId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      const res = await fetchCancelReasons();
      if ("data" in res) {
        setReasons(res.data);
      } else {
        enqueueSnackbar(res.error, { variant: "error" });
      }
    })();
  }, [enqueueSnackbar]);

  const renderDialogContent = (
    <Autocomplete
      options={reasons.map(({ id, name }) => ({ id, name }))}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={t("field_label")} />
      )}
      onChange={(event, value) => {
        setReasonId(value?.id || null);
      }}
    />
  );

  const handleConfirm = useCallback(() => {
    (async () => {
      setIsLoading(true);

      const res = await cancelShipment({ shipmentId, reasonId: reasonId! });

      if ("error" in res) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        enqueueSnackbar(t("success"));
        isOpen.onFalse();
        invalidateCaching(paths.orders);
      }

      setIsLoading(false);
    })();
  }, [enqueueSnackbar, isOpen, reasonId, shipmentId, t]);

  return (
    <>
      <Button
        color="error"
        size="large"
        sx={{ flexGrow: 1, flexBasis: 110 }}
        onClick={() => isOpen.onTrue()}
      >
        {t("action")}
      </Button>

      <ConfirmDialog
        open={isOpen.value}
        onClose={isOpen.onFalse}
        title={t("title")}
        content={
          reasons.length === 0 ? renderDialogLoading : renderDialogContent
        }
        buttonDisabled={!reasonId}
        buttonLoading={isLoading}
        handleConfirmation={handleConfirm}
      />
    </>
  );
}

const renderDialogLoading = (
  <Box
    sx={{
      px: 5,
      width: 1,
      flexGrow: 1,
      minHeight: "4rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
  </Box>
);

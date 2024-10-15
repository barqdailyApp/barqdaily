"use client";

import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Stack,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { useBoolean } from "@/hooks/use-boolean";

import { SingleShipment, ShipmentProduct } from "@/types/order-shipment";

export default function ReturnButton({
  shipment,
}: {
  shipment: SingleShipment;
}) {
  const t = useTranslations("Pages.Orders.Single");
  const returnDialog = useBoolean();

  return (
    <>
      <Button
        size="large"
        sx={{ flexGrow: 1, flexBasis: 110 }}
        onClick={() => returnDialog.onTrue()}
      >
        {t("Return.action")}
      </Button>

      {returnDialog.value && (
        <ReturnDialog
          orderId={shipment.order.id}
          shipmentProducts={shipment.shipment_products}
          onClose={returnDialog.onFalse}
        />
      )}
    </>
  );
}

function ReturnDialog({
  orderId,
  shipmentProducts,
  onClose,
}: {
  orderId: string;
  shipmentProducts: ShipmentProduct[];
  onClose: VoidFunction;
}) {
  const t = useTranslations("Pages.Orders.Single.Return");
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState(false);

  const onSubmit = useCallback(() => {
    (async () => {
      setIsloading(true);
      enqueueSnackbar(t("success"));
      setIsloading(false);
    })();
  }, [enqueueSnackbar, t]);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle textAlign="center">{t("title")}</DialogTitle>
      <DialogContent>
        <Alert severity="info">{t("sub_title")}</Alert>

        <Stack spacing={2} py={2} />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => onClose()}>
          {t("cancel")}
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={() => onSubmit()}
          loading={isLoading}
        >
          {t("submit")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

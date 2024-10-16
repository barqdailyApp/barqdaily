"use client";

import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Stack,
  Button,
  Dialog,
  Rating,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useBoolean } from "@/hooks/use-boolean";

import { addShipmentFeedback } from "@/actions/order-actions";

export default function RateButton({
  shipmentId,
  driverId,
}: {
  shipmentId: string;
  driverId: string;
}) {
  const t = useTranslations("Pages.Orders.Single");
  const rateDialog = useBoolean();

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="large"
        sx={{ flexGrow: 1, flexBasis: 110 }}
        onClick={() => rateDialog.onTrue()}
      >
        {t("Rate.action")}
      </Button>

      {rateDialog.value && (
        <RateDialog
          shipmentId={shipmentId}
          driverId={driverId}
          onClose={rateDialog.onFalse}
        />
      )}
    </>
  );
}

type FeedbackNames = "delivery_time" | "packaging" | "communication";
const feedbackNames: FeedbackNames[] = [
  "delivery_time",
  "packaging",
  "communication",
];

function RateDialog({
  shipmentId,
  driverId,
  onClose,
}: {
  shipmentId: string;
  driverId: string;
  onClose: VoidFunction;
}) {
  const t = useTranslations("Pages.Orders.Single.Rate");
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState(false);
  const [feedback, setFeedback] = useState({
    delivery_time: 1,
    packaging: 1,
    communication: 1,
  });

  const onSubmit = useCallback(() => {
    (async () => {
      setIsloading(true);

      const res = await addShipmentFeedback({
        shipment_id: shipmentId,
        driver_id: driverId,
        ...feedback,
      });

      if ("error" in res) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        enqueueSnackbar(t("success"), { variant: "success" });
        onClose();
      }

      setIsloading(false);
    })();
  }, [driverId, enqueueSnackbar, feedback, onClose, shipmentId, t]);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle textAlign="center">{t("title")}</DialogTitle>
      <DialogContent>
        <Typography variant="h5" textAlign="center" component="p" mb={4}>
          {t("sub_title")}
        </Typography>

        <Stack spacing={2} py={2}>
          {feedbackNames.map((name) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              key={name}
            >
              <Typography component="legend">{t(name)}</Typography>
              <Rating
                value={feedback[name]}
                onChange={(event, newValue) => {
                  setFeedback((prev) => {
                    const newFeedback = { ...prev };
                    newFeedback[name] = newValue || 1;
                    return newFeedback;
                  });
                }}
              />
            </Stack>
          ))}
        </Stack>
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

import { useTranslations } from "next-intl";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { ConfirmDialogProps } from "./types";

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  buttonTitle,
  buttonColor,
  action,
  open,
  onClose,
  handleConfirmation,
  buttonDisabled,
  buttonLoading,
  ...other
}: ConfirmDialogProps) {
  const t = useTranslations("ConfirmDialog");
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 0.5 }}>{title || t("title")}</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ py: 1 }}>
          {content || (
            <Typography variant="body1" color="disabled">
              {t("message")}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          {t("cancel")}
        </Button>

        <LoadingButton
          variant="contained"
          color={buttonColor || "error"}
          onClick={handleConfirmation}
          disabled={buttonDisabled}
          loading={buttonLoading}
        >
          {buttonTitle || t("confirm")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

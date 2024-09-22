import { useTranslations } from "next-intl";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";
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
  ...other
}: ConfirmDialogProps) {
  const t = useTranslations();
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 0.5 }}>
        {title ? t(`${title}`) : t("GLOBAL.BUTTON.DELETE")}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ py: 1 }}>
          <Typography variant="body1" color="disabled">
            {t(
              typeof content === "string" ? content : "MSG.DELETE_CONFIRMATION"
            )}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color={buttonColor || "error"}
          onClick={handleConfirmation}
        >
          {buttonTitle ? t(`${buttonTitle}`) : t("GLOBAL.BUTTON.CONFIRM")}
        </Button>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          {t("GLOBAL.BUTTON.CANCEL")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

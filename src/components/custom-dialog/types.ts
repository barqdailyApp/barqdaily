import { DialogProps } from "@mui/material/Dialog";

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, "title" | "content"> & {
  title?: React.ReactNode;
  buttonTitle?: string;
  buttonColor?: "inherit" | "primary" | "secondary" | "info" | "error";
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  content?: React.ReactNode;
  action?: React.ReactNode;
  onClose: VoidFunction;
  handleConfirmation?: VoidFunction;
};

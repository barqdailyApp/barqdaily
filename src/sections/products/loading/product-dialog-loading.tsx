import { useRouter } from "next/navigation";

import {
  Box,
  Dialog,
  IconButton,
  DialogTitle,
  LinearProgress,
} from "@mui/material";

import Iconify from "@/components/iconify";

export default function ProductDialogLoading() {
  const router = useRouter();

  return (
    <Dialog open onClose={() => router.back()} maxWidth="xs" fullWidth>
      <DialogTitle>
        <IconButton onClick={() => router.back()}>
          <Iconify icon="heroicons:x-mark-16-solid" />
        </IconButton>
      </DialogTitle>

      <Box
        sx={{
          px: 5,
          width: 1,
          flexGrow: 1,
          minHeight: "min(30rem, 80vh)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
      </Box>
    </Dialog>
  );
}

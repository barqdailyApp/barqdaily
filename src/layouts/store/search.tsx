import { Box, TextField } from "@mui/material";

import Iconify from "@/components/iconify";

export default function StoreSearch() {
  return (
    <TextField
      sx={{
        mx: 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "8px",
        "& .MuiFilledInput-root": {
          borderRadius: "8px",
        },
        "& .MuiFilledInput-input": {
          py: 1.5,
          px: 1.75,
        },
      }}
      variant="filled"
      placeholder="Search products..."
      fullWidth
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <Box
            sx={{
              position: "absolute",
              insetInlineEnd: 0,
              height: { sm: "100%" },
              width: "auto",
              aspectRatio: { xs: 1, sm: "1.2/1" },
              marginInlineEnd: { xs: 1, sm: 0 },
              padding: { xs: 0.5, sm: 0 },
              bgcolor: "#212B36",
              color: "white",
              borderRadius: { xs: "100%", sm: "8px" },
              display: "grid",
              placeItems: "center",
            }}
          >
            <Iconify icon="material-symbols:search" width={24} />
          </Box>
        ),
      }}
    />
  );
}

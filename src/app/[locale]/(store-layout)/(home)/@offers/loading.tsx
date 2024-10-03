"use client";

import { Box, Container, LinearProgress } from "@mui/material";

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <Box bgcolor="background.neutral" py={{ xs: 4, sm: 6 }}>
      <Container>
        <Box
          sx={{
            px: 5,
            width: 1,
            flexGrow: 1,
            minHeight: "min(10rem, 80vh)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
        </Box>
      </Container>
    </Box>
  );
}

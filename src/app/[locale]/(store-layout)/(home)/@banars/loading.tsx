"use client";

import { Box, Skeleton, Container } from "@mui/material";

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.background.neutral,
        px: 0.5,
        py: 6,
      })}
    >
      <Container>
        <Skeleton
          variant="rounded"
          width="100%"
          sx={{ aspectRatio: "1920/500", height: "auto" }}
        />
      </Container>
    </Box>
  );
}

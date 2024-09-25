import { Box, LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        px: 5,
        width: 1,
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  );
}

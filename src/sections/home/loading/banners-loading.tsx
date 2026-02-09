import { Box, Skeleton, Container } from "@mui/material";

export default function BannersLoading() {
  return (
    <Box
      sx={{
        px: 0.5,
        py: 6,
      }}
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

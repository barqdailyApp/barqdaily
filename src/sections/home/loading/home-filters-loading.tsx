import { Box, Stack, Skeleton, Container } from "@mui/material";

export default function HomeFiltersLoading() {
  return (
    <Container>
      <Stack direction="row" spacing={3} py={3} px={1}>
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={120}
            sx={{ aspectRatio: "1/1", height: "auto" }}
          />
        ))}
      </Stack>
      <Stack spacing={3}>
        <Box>
          <Skeleton
            width="min(100%, 300px)"
            height={30}
            sx={{ mb: 2, borderRadius: 1.5 }}
          />
          <Stack spacing={1} direction="row" flexWrap="wrap">
            {[...Array(10)].map((__, i) => (
              <Skeleton
                variant="rounded"
                width={115}
                sx={{ aspectRatio: "9/10" }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

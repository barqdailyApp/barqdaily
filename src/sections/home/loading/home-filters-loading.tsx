import { Box, Grid, Stack, Skeleton, Container } from "@mui/material";

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
          <Grid container spacing={3} sx={{ pb: 3 }}>
            {[...Array(10)].map((__, i) => (
              <Grid item xs={12} sm={6} md={2.4} key={i}>
                <Skeleton variant="rounded" width="100%" height={200} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}

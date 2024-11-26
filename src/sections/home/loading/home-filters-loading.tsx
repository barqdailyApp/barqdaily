import { Grid, Stack, Skeleton, Container } from "@mui/material";

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
      <Grid container spacing={3} sx={{ pb: 3 }}>
        {[...Array(10)].map((_, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Skeleton variant="rounded" width="100%" height={200} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

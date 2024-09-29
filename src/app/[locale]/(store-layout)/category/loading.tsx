"use client";

import { Grid, Skeleton } from "@mui/material";

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <Grid container spacing={3}>
      {[...Array(10)].map((_, index) => (
        <Grid item xs={6} md={4} lg={3} key={index}>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Grid>
      ))}
    </Grid>
  );
}

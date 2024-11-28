import { Grid, Skeleton } from "@mui/material";

import { PRODUCTS_PER_PAGE } from "@/config-global";

export default function ProductsListLoading() {
  return (
    <Grid container spacing={3}>
      {[...Array(PRODUCTS_PER_PAGE)].map((_, index) => (
        <Grid item xs={6} md={4} lg={3} key={index}>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Grid>
      ))}
    </Grid>
  );
}

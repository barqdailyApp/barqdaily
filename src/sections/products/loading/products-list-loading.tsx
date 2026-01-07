import { Grid, Skeleton } from "@mui/material";

import { PRODUCTS_PER_PAGE } from "@/config-global";

export default function ProductsListLoading() {
  return (
    <Grid container spacing={3}>
      {[...Array(PRODUCTS_PER_PAGE)].map((_, index) => (
        <Grid
          item
          xs={12 / 2}
          sm={12 / 3}
          md={12 / 4}
          lg={12 / 5}
          xl={12 / 7}
          key={index}
        >
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Grid>
      ))}
    </Grid>
  );
}

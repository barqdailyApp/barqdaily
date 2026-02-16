"use client";

import { Box, Grid, Stack, Container, Typography } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

import { CategoryGroup } from "@/types/products";

import CategoryCard from "./category-card";

interface Props {
  groups: CategoryGroup[];
}

export default function CategoryGroupsList({ groups }: Props) {
  return (
    <Container
      sx={{
        width: "100%",
        position: "relative",
        pb: SECTION_PADDING,
      }}
    >
      <Stack spacing={4}>
        {groups
          .filter((group) => group.categories.length > 0)
          .map(({ id, name, categories }) => (
            <Box key={id}>
              <Typography variant="h4" component="h3" gutterBottom>
                {name}
              </Typography>
              <Grid container spacing={1}>
                {categories?.map((item, index) => (
                  <Grid
                    item
                    xs={12 / 3}
                    sm={12 / 4}
                    md={12 / 6}
                    lg={12 / 8}
                    key={index}
                  >
                    <CategoryCard category={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
      </Stack>
    </Container>
  );
}

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
      <Stack spacing={3}>
        {groups
          .filter((group) => group.categories.length > 0)
          .map(({ id, name, categories }) => (
            <Box key={id}>
              <Typography variant="h6" component="h3" gutterBottom>
                {name}
              </Typography>
              <Grid container spacing={1}>
                {categories?.map((item, index) => (
                  <Grid item xs={4} sm={2} md={12 / 8} lg={1} key={index}>
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

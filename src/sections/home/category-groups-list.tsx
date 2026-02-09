"use client";

import { Box, Stack, Container, Typography } from "@mui/material";

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
              <Stack spacing={1} direction="row" flexWrap="wrap">
                {categories?.map((item, index) => (
                  <Box width={115} key={index}>
                    <CategoryCard category={item} />
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
      </Stack>
    </Container>
  );
}

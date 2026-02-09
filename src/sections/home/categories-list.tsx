import { Grid, Container } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

import { Category } from "@/types/products";

import CategoryCard from "./category-card";

interface Props {
  categories: Category[];
}

export default function CategoriesList({ categories }: Props) {
  return (
    <Container
      sx={{
        width: "100%",
        position: "relative",
        pb: SECTION_PADDING,
      }}
    >
      <Grid container spacing={1}>
        {categories?.map((item, index) => (
          <Grid item xs={6} sm={3} md={2} lg={12 / 8} key={index}>
            <CategoryCard category={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { Card, Grid, CardMedia, Container, Typography } from "@mui/material";

import { Category } from "@/types/products";

interface Props {
  categories: Category[];
}

export default function CategoriesList({ categories }: Props) {
  const router = useRouter();

  return (
    <Container sx={{ width: "100%", position: "relative", px: 0.5, py: 6 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {categories?.map((item, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card
              sx={(theme) => ({
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.primary.lighter,
              })}
            >
              <Typography
                variant="body2"
                textAlign="center"
                py={1.5}
                display="block"
                fontWeight={700}
              >
                {item.name}
              </Typography>

              <CardMedia
                component="img"
                sx={{
                  height: "auto",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                image={item.logo}
                alt={item.name}
                onClick={() => router.push(`/category?categoryId=${item.id}`)}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

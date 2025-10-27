"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Box,
  Card,
  Grid,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

import { Category } from "@/types/products";

interface Props {
  categories: Category[];
}

export default function CategoriesList({ categories }: Props) {
  const router = useRouter();

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
            <Card
              sx={(theme) => ({
                border: `1px solid ${theme.palette.primary.main}`,
                // backgroundColor: theme.palette.primary.lighter,
                position: "relative",
                minHeight: "100%",
                display: "grid",
                alignContent: "space-between",
                borderRadius: 2,
              })}
            >
              <Box
                className="card-clickable-layer"
                aria-hidden
                sx={{ position: "absolute", inset: 0, cursor: "pointer" }}
                href={`/category?categoryId=${item.id}`}
                component={Link}
              />
              <Typography
                variant="body2"
                display="block"
                fontWeight={700}
                sx={{
                  position: "absolute",
                  top: 0,
                  insetInline: 0,
                  px: 1,
                  py: 1,
                }}
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

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Box, Card, CardMedia, Typography } from "@mui/material";

import { Category } from "@/types/products";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  const router = useRouter();
  return (
    <Card
      sx={(theme) => ({
        // border: `1px solid ${theme.palette.primary.main}`,
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
        href={`/category?categoryId=${category.id}`}
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
        {category.name}
      </Typography>

      <CardMedia
        component="img"
        sx={{
          height: "auto",
          aspectRatio: "9/10",
          objectFit: "cover",
          cursor: "pointer",
        }}
        image={category.logo}
        alt={category.name}
        onClick={() => router.push(`/category?categoryId=${category.id}`)}
      />
    </Card>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { Card, CardMedia, Typography } from "@mui/material";

import { Category } from "@/types/products";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  const router = useRouter();
  return (
    <Card
      sx={{
        position: "relative",
        minHeight: "100%",
        display: "grid",
        alignContent: "space-between",
        borderRadius: 2,
        cursor: "pointer",
      }}
      onClick={() => router.push(`/category?categoryId=${category.id}`)}
      role="button"
      aria-label={category.name}
    >
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
      />
    </Card>
  );
}

"use client";

import { useSearchParams } from "next/navigation";

import { Box, Pagination } from "@mui/material";

import { useQueryString } from "@/hooks/use-queryString";

export default function ProductPagination({
  pagesCount,
}: {
  pagesCount: number;
}) {
  const searshParams = useSearchParams();
  const { createQueryString } = useQueryString();

  const page = Number(searshParams.get("page") || "1");
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    createQueryString([{ name: "page", value: String(value) }], true);
  };

  return (
    <Box display="flex" justifyContent="center" pt={5}>
      <Pagination
        page={page}
        onChange={handleChange}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
        size="large"
      />
    </Box>
  );
}

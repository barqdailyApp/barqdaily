"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useQueryString } from "@/hooks/use-queryString";

import { fNumber } from "@/utils/format-number";

import { customPaginationRowsOptions } from "../constant";

type Props = {
  count: number;
};
export default function CustomPagination({ count }: Props) {
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString();

  const hasPage = searchParams.get("page");
  const hasLimit = searchParams.get("limit");
  const pagesCount = Math.ceil(
    count / (hasLimit ? Number(hasLimit) : customPaginationRowsOptions[0])
  );

  // eslint-disable-next-line no-nested-ternary
  const page = hasPage
    ? Number(hasPage) > pagesCount
      ? pagesCount
      : Number(hasPage)
    : 1;

  let currentLimit = hasLimit
    ? Number(hasLimit)
    : customPaginationRowsOptions[0];

  if (hasLimit) {
    const lastElement =
      customPaginationRowsOptions[customPaginationRowsOptions.length - 1];
    if (Number(hasLimit) > count) {
      const filter = customPaginationRowsOptions.filter((x) => count <= x);
      currentLimit = filter.length > 0 ? filter[0] : lastElement;
    } else {
      const filter = customPaginationRowsOptions.filter(
        (x) => Number(hasLimit) <= x
      );
      currentLimit = filter.length > 0 ? filter[0] : lastElement;
    }
  }

  const handleChange = useCallback(
    (event: unknown, newPage: number) => {
      createQueryString([
        {
          name: "page",
          value: String(newPage),
        },
      ]);
    },
    [createQueryString]
  );
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: {
          xs: "center",
          sm: "space-between",
        },
        flexWrap: "wrap",
      }}
    >
      <Pagination page={page} count={pagesCount} onChange={handleChange} />
      <RowsPerPage
        count={count}
        currentCount={page * currentLimit}
        currentLimit={currentLimit}
        currentPage={page}
      />
    </Stack>
  );
}

type RowsType = {
  count: number;
  currentCount: number;
  currentLimit: number;
  currentPage: number;
};
function RowsPerPage({
  count,
  currentCount,
  currentLimit,
  currentPage,
}: RowsType) {
  const t = useTranslations();
  const { createQueryString } = useQueryString();

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      if (Number(event.target.value) > count) return;
      createQueryString([
        {
          name: "limit",
          value: String(event.target.value),
        },
      ]);
    },
    [count, createQueryString]
  );
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography>{t("GLOBAL.LABEL.SHOW")}</Typography>
      <Select
        defaultValue={String(customPaginationRowsOptions[0])}
        onChange={handleChange}
      >
        {customPaginationRowsOptions.map((x) => (
          <MenuItem key={x} value={x}>
            {x}
          </MenuItem>
        ))}
      </Select>
      <Typography>
        {fNumber(currentPage * currentLimit - (currentLimit - 1))} -{" "}
        {fNumber(currentCount)} {t("GLOBAL.LABEL.OF")} {fNumber(count)}
      </Typography>
    </Stack>
  );
}

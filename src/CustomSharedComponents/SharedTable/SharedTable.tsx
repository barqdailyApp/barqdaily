"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import Scrollbar from "@/components/scrollbar";

import useTable from "./use-table";
import TableNoData from "./table-no-data";
import { SharedTableProps } from "./types";
import SharedTableRow from "./SharedTableRow";
import TableHeadCustom from "./table-head-custom";
import TablePaginationCustom from "./table-pagination-custom";
// ----------------------------------------------------------------------
export default function SharedTable<T extends { id: string }>({
  data,
  actions,
  tableHead,
  disablePagination,
  customRender,
  count,
}: SharedTableProps<T>) {
  const table = useTable();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const hasPage = searchParams.get("page");

  const page = hasPage ? Number(searchParams.get("page")) - 1 : 0;
  const limit = Number(searchParams.get("limit")) || 5;
  return (
    <Box>
      <TableContainer sx={{ position: "relative", overflow: "unset" }}>
        <Scrollbar>
          <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableHead} />

            <TableBody>
              {data.map((row) => (
                <SharedTableRow<T>
                  key={row.id}
                  row={row}
                  actions={actions}
                  customRender={customRender}
                  headIds={
                    tableHead
                      .map((x) => x.id)
                      .filter(
                        (x) => x !== "" && x !== "rowsActions"
                      ) as (keyof T)[]
                  }
                />
              ))}

              <TableNoData notFound={!data.length} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      {!disablePagination && (
        <TablePaginationCustom
          count={count}
          page={page}
          rowsPerPage={limit}
          onPageChange={table.onChangePage!}
          onRowsPerPageChange={table.onChangeRowsPerPage!}
          labelRowsPerPage={t("GLOBAL.LABEL.ROWS_PER_PAGE")}
          labelDisplayedRows={({ from, to, count: rows }) =>
            `${from}-${to} ${t("GLOBAL.LABEL.OF")} ${
              rows !== -1 ? rows : `${t("GLOBAL.LABEL.MORE_THAN")} ${to}`
            }`
          }
          //
          dense={table.dense!}
          onChangeDense={table.onChangeDense!}
        />
      )}
    </Box>
  );
}

"use client";

import { Card, CardProps } from "@mui/material";

export default function OrderCardWrapper({
  children,
  sx,
  ...others
}: { children: React.ReactNode } & CardProps) {
  return (
    <Card
      {...others}
      sx={{
        ...sx,
        marginTop: 4,
        width: "100%",
        border: "solid 1px",
        borderColor: "grey.200",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        "&.selected": (theme) => ({
          border: `1px solid ${theme.palette.primary.main}`,
        }),
        "&:hover": (theme) => ({
          boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}, 0px 0px 0px 4px ${theme.palette.primary.main}`,
          "&:has(.card-clickable-layer:active)": {
            boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`,
          },
          zIndex: 9,
        }),
      }}
    >
      {children}
    </Card>
  );
}

import Link from "next/link";

import { Box, Card, styled, CardProps } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  "&.selected": { boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}` },
  "&:hover": {
    boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}, 0px 0px 0px 4px ${theme.palette.primary.main}`,
    "&:has(.card-clickable-layer:active)": {
      boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`,
    },
    zIndex: 9,
  },
}));

export default function ActiveCard({
  active,
  children,
  ...props
}: { active?: boolean; children: React.ReactNode } & (
  | { href?: string }
  | ({ onClick?: VoidFunction } & CardProps)
)) {
  const href = "href" in props ? props.href : undefined;
  const onClick = "onClick" in props ? props.onClick : undefined;

  return (
    <StyledCard
      className={active ? "selected" : ""}
      {...{ ...props, onClick: undefined, href: undefined }}
    >
      <Box
        className="card-clickable-layer"
        aria-hidden
        sx={{ position: "absolute", inset: 0, cursor: "pointer" }}
        {...(href ? { href, component: Link, scroll: false } : {})}
        onClick={onClick}
      />
      {children}
    </StyledCard>
  );
}

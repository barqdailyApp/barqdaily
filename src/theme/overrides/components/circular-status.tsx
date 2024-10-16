"use client";

import { Theme, alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

type Colors =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";
const colors: Colors[] = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
];

interface CircularStatusProps {
  color?: Colors | "default"; // "default" => theme.palette.text.disabled
  variant?: "soft" | "outlined"; // "outlined" by default
}

export function circularStatus(theme: Theme) {
  return {
    CircularStatus: {
      styleOverrides: {
        root: {
          color: theme.palette.text.disabled,
          border: "solid 1px",
          borderColor: theme.palette.text.disabled,
          borderRadius: "50px",
          padding: theme.spacing(0.75),
          width: "fit-content",
        },
        ...colors.reduce(
          (
            acc: Record<
              Colors,
              { color: string; borderColor: string; backgroundColor: string }
            >,
            color
          ) => {
            acc[color] = {
              color: theme.palette[color].main,
              borderColor: theme.palette[color].main,
              backgroundColor: alpha(theme.palette[color].main, 0.1),
            };
            return acc;
          },
          {} as Record<
            Colors,
            { color: string; borderColor: string; backgroundColor: string }
          >
        ),
      },
      variants: [
        {
          props: { variant: "soft" },
          style: {
            borderColor: "transparent",
          },
        },
      ],
    },
  };
}

export const CircularStatus = styled("div", {
  name: "CircularStatus",
  shouldForwardProp: (prop) =>
    prop !== "color" && prop !== "variant" && prop !== "sx",
  overridesResolver: (props, styles) => [
    styles.root,
    props.color && styles[props.color],
  ],
})<CircularStatusProps>({});

import { forwardRef } from "react";

import { Button } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";

import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

interface Props extends StackProps {
  name?: string;
  quantity: number;
  disabledIncrease?: boolean;
  disabledDecrease?: boolean;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
  min?: number;
}

const IncrementerButton = forwardRef<HTMLDivElement, Props>(
  (
    {
      quantity,
      onIncrease,
      onDecrease,
      disabledIncrease,
      disabledDecrease,
      min = 1,
      sx,
      ...other
    },
    ref
  ) => (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 0.5,
        width: 88,
        borderRadius: 1,
        typography: "subtitle2",
        ...sx,
      }}
      {...other}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ p: 1.25, minWidth: "fit-content" }}
      >
        <Iconify icon={quantity > min ? "eva:minus-fill" : "mage:trash"} />
      </Button>

      {quantity}

      <Button
        variant="contained"
        color="primary"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ p: 1.25, minWidth: "fit-content" }}
      >
        <Iconify icon="mingcute:add-line" />
      </Button>
    </Stack>
  )
);

export default IncrementerButton;

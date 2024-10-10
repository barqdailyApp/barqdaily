import { Stack, Button, Typography } from "@mui/material";

export function OrderSummaryCard() {
  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <Typography variant="body2" fontWeight="500">
          Total Amount
        </Typography>
        <Typography variant="caption" fontWeight="400">
          230 YER
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <Typography variant="body2" fontWeight="500">
          Payment Method
        </Typography>
        <Typography variant="caption" fontWeight="400">
          Cash on delivery
        </Typography>
      </Stack>
      <Stack alignItems="center" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="error"
          size="large"
          sx={{ border: "none", width: "156px", height: "60px" }}
        >
          Cancel order
        </Button>
      </Stack>
    </Stack>
  );
}

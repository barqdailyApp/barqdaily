import { Stack, Typography, Button } from "@mui/material";
import Iconify from "@/components/iconify";
import { Shipments } from "@/types/order-details";
export function OrderDriverInfoCard({ driver }: { driver: Shipments }) {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Iconify icon="tabler:helmet" width={24} />
        <Stack>
          <Typography variant="caption">Driver Name</Typography>
          <Typography variant="body2" fontWeight="bold">
            {driver?.driver?.username || "No Driver Assigned"}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          sx={{ borderRadius: "10rem", p: 1, minWidth: 0 }}
        >
          <Iconify icon="material-symbols:map-outline" />
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ borderRadius: "10rem", p: 1, minWidth: 0 }}
        >
          <Iconify icon="majesticons:comment-line" />
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ borderRadius: "10rem", p: 1, minWidth: 0 }}
        >
          <Iconify icon="ic:outline-phone" />
        </Button>
      </Stack>
    </>
  );
}

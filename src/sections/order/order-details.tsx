import Image from "next/image";

import { Box, Stack, Button, Divider, Typography } from "@mui/material";

import { ShipmentProduct } from "@/types/order-details";

export function OrderDetailsCard({
  shipmentPrdoucts,
}: {
  shipmentPrdoucts: ShipmentProduct[];
}) {
  return (
    <Stack spacing={2} pt={2} alignItems="stretch" width="100%">
      {shipmentPrdoucts.map((item, index) => (
        <>
          {index !== 0 ? <Divider flexItem /> : null}

          <Box key={index} px={2}>
            <Stack spacing={1} justifyContent="flex-start">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Image
                  src={item.product_logo}
                  alt={item.product_name}
                  width={60}
                  height={60}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Stack sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {item.product_name}
                  </Typography>
                  <Typography variant="caption" fontWeight="350">
                    {item.measurement_unit}
                  </Typography>
                </Stack>
                <Typography variant="body2" fontWeight="bold">
                  {item.measurement_unit} /{" "}
                  <Typography
                    component="span"
                    variant="caption"
                    fontWeight="350"
                  >
                    1kg
                  </Typography>
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mt: 1 }}
              >
                <Stack direction="row" spacing={0.5}>
                  <Typography variant="caption">Total:</Typography>
                  <Typography variant="caption" fontWeight="bold">
                    {item.total_price}
                  </Typography>
                </Stack>
                <Button color="primary" variant="contained">
                  Buy Again
                </Button>
              </Stack>
            </Stack>
          </Box>
        </>
      ))}
    </Stack>
  );
}

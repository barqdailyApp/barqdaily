import {
  Container,
  Card,
  Box,
  Stack,
  Typography,
  CardContent,
} from "@mui/material";

import { OrderDetailsCard } from "@/sections/order-details/view/order-details";
import { OrderDriverInfoCard } from "@/sections/order-details/view/order-driver";
import { OrderProcessCard } from "@/sections/order-details/view/order-process";
import { OrderSummaryCard } from "@/sections/order-details/view/order-summary";

export function OrderDetails() {
  const renderDetails = <OrderDetailsCard />;

  const renderDriverTitle = (
    <Typography
      variant="h6"
      fontWeight="bold"
      textAlign="center"
      sx={{ mb: 2 }}
    >
      Driver Info
    </Typography>
  );

  const renderDriver = <OrderDriverInfoCard />;

  const renderOrderProcess = <OrderProcessCard />;

  const renderOrderSummary = <OrderSummaryCard />;

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "grey.200",
          py: 7,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Order Details
        </Typography>
      </Box>

      <Box
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container>
          <Typography variant="h6">Order Details</Typography>
          <Box display={{ md: "flex" }} justifyContent="space-between">
            {renderDetails}

            <Box sx={{ width: "100px", px: 4, height: 24 }} />

            <Stack
              direction="column"
              spacing={2}
              width={{ md: "350px" }}
              flexShrink={0}
            >
              <Card
                sx={{
                  border: "1px solid #CFCFCF",
                  borderRadius: "20px",
                  padding: 0.3,
                }}
              >
                <CardContent>
                  {renderDriverTitle}

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {renderDriver}
                  </Box>
                </CardContent>
              </Card>

              <Card
                sx={{
                  border: "1px solid #CFCFCF",
                  borderRadius: "20px",
                  padding: 0.3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ mb: 3 }}
                  >
                    Order ID GC092921
                  </Typography>
                  <Box sx={{ px: -1 }}>{renderOrderProcess}</Box>
                </CardContent>
              </Card>
              <Card
                sx={{
                  border: "1px solid #CFCFCF",
                  borderRadius: "20px",
                  padding: 0.3,
                }}
              >
                <CardContent>{renderOrderSummary}</CardContent>
              </Card>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default OrderDetails;

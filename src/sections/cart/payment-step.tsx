import Image from "next/image";

import { Box, Grid, Typography, CardContent } from "@mui/material";

import { useCartStore } from "@/contexts/cart-store";
import { usecheckoutStore } from "@/contexts/checkout-store";

import ActiveCard from "@/components/active-card";

import PaymentDetails from "./payment-details";

export default function PaymentStep() {
  const { setPromocode } = useCartStore();
  const { payments, choosenPayment, setChoosenPayment } = usecheckoutStore();

  const renderPayments = (
    <Grid container spacing={1}>
      {payments.map((payment) => (
        <Grid item xs={6} sm={3} key={payment.id}>
          <ActiveCard
            active={choosenPayment?.id === payment.id}
            onClick={() => {
              setChoosenPayment(payment);
              setPromocode(null);
            }}
            sx={{ minHeight: "100%" }}
            activeRing="bold"
          >
            <CardContent
              sx={{
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                gap: 1,
              }}
            >
              <Image
                width={100}
                height={100}
                src={payment.logo}
                alt={payment.name}
                style={{ borderRadius: "1.5rem" }}
              />
              <Typography variant="h6">{payment.name}</Typography>
            </CardContent>
          </ActiveCard>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box>
      {renderPayments}
      <Box mt={3} />
      <PaymentDetails />
    </Box>
  );
}

"use client";

import { useTranslations } from "next-intl";

import { Box, Step, Stack, Stepper, StepLabel, Container } from "@mui/material";

import { usecheckoutStore } from "@/contexts/checkout-store";

import CartStep from "../cart-step";
import { steps } from "../config-cart";
import OrderSumamry from "../order-summary";

export default function Cart() {
  const t = useTranslations("Pages.Cart");

  const { step } = usecheckoutStore();

  const renderHeadding = (
    <Stack py={5} bgcolor="background.neutral">
      <Container>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{t(`Steps.${label}`)}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Stack>
  );

  const stepsElements = [<CartStep />];

  return (
    <>
      {renderHeadding}
      <Container sx={{ py: 3 }}>
        <Stack gap={3} direction={{ md: "row" }}>
          <Box flexGrow={1}>{stepsElements[step]}</Box>
          <Box flexShrink={0} width={{ md: "380px" }}>
            <OrderSumamry />
          </Box>
        </Stack>
      </Container>
    </>
  );
}

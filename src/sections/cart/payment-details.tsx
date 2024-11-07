import { useTranslations } from "next-intl";
import { useMemo, useEffect, useCallback } from "react";

import {
  Box,
  Card,
  Link,
  Stack,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  CardContent,
  FormControlLabel,
} from "@mui/material";

import { RouterLink } from "@/routes/components";

import { useAuthContext } from "@/auth/hooks";
import { usecheckoutStore } from "@/contexts/checkout-store";

export default function PaymentDetails() {
  const t = useTranslations("Pages.Cart.Payment");
  const { choosenPayment, paymentForm, setPaymentForm } = usecheckoutStore();
  const { user } = useAuthContext();

  const handleChange = useCallback(
    (
      name: "transaction_number" | "notes" | "terms",
      value: string | boolean
    ) => {
      setPaymentForm((prev) => ({
        ...prev,
        [name]: name === "terms" ? !!value : String(value),
      }));
    },
    [setPaymentForm]
  );

  useEffect(() => {
    setPaymentForm((prev) => ({ ...prev, transaction_number: undefined }));
  }, [choosenPayment?.type, setPaymentForm]);

  const renderExtraLabel: null | React.ReactNode = useMemo(() => {
    switch (choosenPayment?.type) {
      case "KURAIMI":
        return (
          <>
            <Box>
              <Typography variant="h4" textAlign="center">
                {t("kurami-title")}
              </Typography>
              {t.rich("kurami-description", {
                typography: (chunks) => (
                  <Typography mt={1} textAlign="center">
                    {chunks}
                  </Typography>
                ),
                number: () => <span dir="ltr">{user?.phone || ""}</span>,
              })}
            </Box>
            <Box>
              <FormLabel>{t("kurami-transaction-number")}</FormLabel>
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                value={paymentForm.transaction_number}
                onChange={(e) =>
                  handleChange("transaction_number", e.target.value)
                }
              />
            </Box>
          </>
        );
      case "JAWALI":
        return (
          <>
            <Typography mt={1} textAlign="center">
              {t("jawali-description")}
            </Typography>
            <Box>
              <FormLabel>{t("jawali-transaction-number")}</FormLabel>
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                value={paymentForm.transaction_number}
                onChange={(e) =>
                  handleChange("transaction_number", e.target.value)
                }
              />
            </Box>
          </>
        );
      case "JAIB":
        return (
          <>
            <Typography mt={1} textAlign="center">
              {t("jaib-description")}
            </Typography>
            <Box>
              <FormLabel>{t("jaib-transaction-number")}</FormLabel>
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                value={paymentForm.transaction_number}
                onChange={(e) =>
                  handleChange("transaction_number", e.target.value)
                }
              />
            </Box>
          </>
        );
      default:
        return null;
    }
  }, [choosenPayment?.type, paymentForm, handleChange, t, user?.phone]);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {renderExtraLabel}
          <Box>
            <FormLabel>{t("notes")}</FormLabel>
            <TextField
              rows={3}
              multiline
              fullWidth
              value={paymentForm.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={paymentForm.terms}
                onChange={(_, value) => handleChange("terms", value)}
              />
            }
            label={t.rich("terms", {
              link: (chunks) => (
                <Link href="#" component={RouterLink}>
                  {chunks}
                </Link>
              ),
            })}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

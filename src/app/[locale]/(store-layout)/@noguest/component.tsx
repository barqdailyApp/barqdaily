"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  Box,
  Stack,
  Button,
  Dialog,
  Typography,
  DialogContent,
} from "@mui/material";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useNoGuestStore } from "@/contexts/no-guest";

export default function NoGuest() {
  const t = useTranslations("Pages.NoGuest");
  const { open, setOpen } = useNoGuestStore();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
      <DialogContent sx={{ py: 4, px: 2 }}>
        <Stack>
          <Box
            bgcolor="background.neutral"
            maxWidth="100%"
            width={250}
            height="auto"
            p={2}
            borderRadius={4}
            mx="auto"
            display="grid"
            sx={{ placeItems: "center", aspectRatio: 1 }}
          >
            <Image
              width={180}
              height={180}
              src="/assets/icons/cart/sad.svg"
              alt="done"
            />
          </Box>
          <Typography variant="h4" mt={4} textAlign="center">
            {t("title")}
          </Typography>
          <Typography textAlign="center">{t("message")}</Typography>

          <Button
            color="primary"
            variant="contained"
            href={paths.auth.jwt.login}
            LinkComponent={RouterLink}
            onClick={() => setOpen(false)}
            sx={{ mt: 2 }}
          >
            {t("login")}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ mt: 1 }}
          >
            {t("browsing")}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

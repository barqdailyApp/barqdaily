import { useTranslations } from "next-intl";

import { Box, Divider, ButtonBase, Typography } from "@mui/material";

import { useBoolean } from "@/hooks/use-boolean";

import { usecheckoutStore } from "@/contexts/checkout-store";

import Label from "@/components/label";
import Iconify from "@/components/iconify";

import AddressDialog from "./address-dialog";

export default function AddressSelect() {
  const t = useTranslations("Pages.Cart.Location");
  const { choosenDeliveryType, choosenAddress } = usecheckoutStore();
  const isDialogOpen = useBoolean();

  if (choosenDeliveryType === "WAREHOUSE_PICKUP") return null;

  return (
    <>
      <Divider />
      <ButtonBase
        sx={{ justifyContent: "flex-start", textAlign: "start" }}
        onClick={() => isDialogOpen.onTrue()}
      >
        <Label
          color="primary"
          sx={{
            aspectRatio: 1,
            width: 35,
            height: "auto",
            mx: 1.5,
            cursor: "inherit",
          }}
        >
          <Iconify icon="tabler:home-filled" />
        </Label>

        <Box py={2}>
          <Typography fontWeight={700}>
            {t("deliver-to", { location: choosenAddress?.name })}
          </Typography>
          <Typography variant="caption">{choosenAddress?.address}</Typography>
        </Box>
      </ButtonBase>
      {isDialogOpen.value && (
        <AddressDialog
          open={isDialogOpen.value}
          onClose={isDialogOpen.onFalse}
        />
      )}
    </>
  );
}

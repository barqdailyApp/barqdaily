import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";

import {
  Grid,
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useBoolean } from "@/hooks/use-boolean";

import { usecheckoutStore } from "@/contexts/checkout-store";
import { setFavoriteAddress } from "@/actions/profile-actions";

import { Address } from "@/types/profile";

import AddressCard from "./address-card";
import NewEditAddressForm from "./new-edit-address-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddressDialog({ open, onClose }: Props) {
  const t = useTranslations("Pages.Cart.Location");
  const { addresses, choosenAddress, setChoosenAddress } = usecheckoutStore();
  const [selectedItem, setSelectedItem] = useState(choosenAddress);
  const isFormOpen = useBoolean();
  const [selectedEditItem, setSelectedEditItem] = useState<Address | null>(
    null
  );

  // Change Choosen Address on change of Addresses
  useEffect(() => {
    if (!addresses.find((item) => item.id === choosenAddress?.id)) {
      setChoosenAddress(addresses.length ? addresses[0] : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  useEffect(() => {
    setSelectedItem(choosenAddress);
  }, [choosenAddress]);

  const handleSave = useCallback(() => {
    if (!selectedItem) return;

    (async () => {
      if (choosenAddress?.id !== selectedItem.id) {
        await setFavoriteAddress(selectedItem.id);
      }
    })();

    setChoosenAddress(selectedItem);
    onClose();
  }, [choosenAddress?.id, onClose, selectedItem, setChoosenAddress]);

  const renderCards = (
    <Grid container spacing={2} py={1}>
      {addresses.map((item) => (
        <Grid item key={item.id} xs={12} sm={6}>
          <AddressCard
            address={item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            handleEdit={() => {
              isFormOpen.onTrue();
              setSelectedEditItem({
                ...item,
                is_favorite: selectedItem?.id === item.id,
              });
            }}
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderContent = (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="inherit">{t("select-title")}</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            isFormOpen.onTrue();
            setSelectedEditItem(null);
          }}
        >
          {t("new-address")}
        </Button>
      </DialogTitle>
      <DialogContent>{renderCards}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => onClose()}>
          {t("cancel")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSave()}
        >
          {t("save")}
        </Button>
      </DialogActions>
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {!isFormOpen.value && renderContent}
      {isFormOpen.value && (
        <NewEditAddressForm
          address={selectedEditItem}
          onClose={isFormOpen.onFalse}
        />
      )}
    </Dialog>
  );
}

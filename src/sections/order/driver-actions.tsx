"use client";

import {
  Button,
  Dialog,
  Tooltip,
  IconButton,
  ButtonProps,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useBoolean } from "@/hooks/use-boolean";

import Iconify from "@/components/iconify";
import { GoogleMap } from "@/components/map";

import { Position } from "@/types/map";
import { Driver } from "@/types/order-details";
import { useTranslations } from "next-intl";

const buttonAttributes: Partial<ButtonProps> = {
  color: "primary",
  variant: "contained",
  sx: { borderRadius: "10rem", p: 1, minWidth: 0 },
};

export default function DriverActions({ driver }: { driver: Driver }) {
  const mapOpen = useBoolean();

  const renderPhone = (
    <Tooltip
      title={driver.phone}
      arrow
      componentsProps={{
        tooltip: { dir: "ltr" },
      }}
    >
      <Button
        {...buttonAttributes}
        href={`tel:${driver.phone}`}
        LinkComponent="a"
      >
        <Iconify icon="ic:outline-phone" />
      </Button>
    </Tooltip>
  );

  const renderChat = (
    <Button {...buttonAttributes} disabled>
      <Iconify icon="majesticons:comment-line" />
    </Button>
  );

  const renderMap = (
    <Button {...buttonAttributes} onClick={() => mapOpen.onTrue()}>
      <Iconify icon="material-symbols:map-outline" />
    </Button>
  );

  return (
    <>
      {renderPhone}
      {renderMap}
      {renderChat}
      {mapOpen.value && (
        <MapDialog
          onClose={mapOpen.onFalse}
          position={{ lat: driver.latitude, lng: driver.longitude }}
        />
      )}
    </>
  );
}

function MapDialog({
  position,
  onClose,
}: {
  position: Position;
  onClose: VoidFunction;
}) {
  const t = useTranslations("Pages.Orders");

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{t("track_order")}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => onClose()}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Iconify icon="material-symbols:close" />
      </IconButton>
      <DialogContent sx={{ height: "20rem", maxHeight: "100%" }}>
        <GoogleMap staticPosition defaultPosition={position} />
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
}

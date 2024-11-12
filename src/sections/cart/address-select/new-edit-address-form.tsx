import * as yup from "yup";
import { useMemo } from "react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  FormLabel,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
} from "@mui/material";

import { usecheckoutStore } from "@/contexts/checkout-store";
import { addAddress, editAddress } from "@/actions/profile-actions";

import { GoogleMap } from "@/components/map";
import FormProvider, {
  RHFCheckbox,
  RHFTextField,
} from "@/components/hook-form";

import AuthPhoneField, {
  phoneSchema,
} from "@/sections/auth/jwt/components/phone-field";

import { Address } from "@/types/profile";

interface Props {
  address: Address | null;
  onClose: () => void;
}

export default function NewEditAddressForm({ address, onClose }: Props) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();
  const { setAddresses, setChoosenAddress } = usecheckoutStore();

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(t("Global.Error.name_required")),
        address: yup
          .string()
          .required(t("Global.Error.address_description_required")),
        phone: phoneSchema(yup, t),
        latitude: yup.string().required(t("Global.Error.location_required")),
        longitude: yup.string().required(t("Global.Error.location_required")),
        is_favorite: yup.boolean().required(),
      })
    ),
    defaultValues: useMemo(
      () => ({
        name: address?.name || "",
        address: address?.address || "",
        phone: address?.phone || "",
        latitude: address?.latitude || "",
        longitude: address?.longitude || "",
        is_favorite: address?.is_favorite || false,
      }),
      [
        address?.address,
        address?.is_favorite,
        address?.latitude,
        address?.longitude,
        address?.name,
        address?.phone,
      ]
    ),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (address) {
      const res = await editAddress({ ...data, id: address.id });
      if ("error" in res) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        setAddresses((prev) =>
          prev.map((item) => (item.id === address.id ? res : item))
        );
        if (res.is_favorite) setChoosenAddress(res);
        onClose();
      }
    } else {
      const res = await addAddress(data);
      if ("error" in res) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        setAddresses((prev) => [...prev, res]);
        if (res.is_favorite) setChoosenAddress(res);
        onClose();
      }
    }
  });

  return (
    <>
      <DialogTitle>
        {t(`Pages.Cart.Location.${address ? "edit-title" : "new-title"}`)}
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods}>
          <Box height="20rem">
            <GoogleMap
              defaultPosition={
                watch("latitude") && watch("longitude")
                  ? {
                      lat: Number(watch("latitude")),
                      lng: Number(watch("longitude")),
                    }
                  : undefined
              }
              setCurrentPosition={(position) => {
                methods.setValue("latitude", position.lat.toString());
                methods.setValue("longitude", position.lng.toString());
              }}
            />
          </Box>
          {(errors?.latitude || errors?.longitude) && (
            <FormHelperText error>
              {errors?.latitude?.message || errors?.longitude?.message}
            </FormHelperText>
          )}

          <FormLabel sx={{ mt: 1 }}>{t("Global.Label.name")}</FormLabel>
          <RHFTextField name="name" />

          <FormLabel sx={{ mt: 1 }}>
            {t("Global.Label.address_description")}
          </FormLabel>
          <RHFTextField name="address" />

          <RHFCheckbox
            name="is_favorite"
            label={t("Global.Label.is_default_address")}
            sx={{ mt: 1 }}
          />
          <AuthPhoneField name="phone" sx={{ mt: 1 }} />
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => onClose()}>
          {t("Pages.Cart.Location.back")}
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isSubmitting}
          onClick={() => onSubmit()}
        >
          {t(`Pages.Cart.Location.${address ? "edit" : "new"}`)}
        </LoadingButton>
      </DialogActions>
    </>
  );
}

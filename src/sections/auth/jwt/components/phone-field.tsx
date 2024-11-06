import Yup from "yup";
import { useTranslations } from "next-intl";

import {
  Box,
  Stack,
  BoxProps,
  FormLabel,
  Typography,
  InputAdornment,
} from "@mui/material";

import { useDir } from "@/routes/hooks/use-dir";

import Iconify from "@/components/iconify";
import { RHFTextField } from "@/components/hook-form";

export default function AuthPhoneField({
  name = "phoneNumber",
  label = "Global.Label.phone",
  ...other
}: {
  name?: string;
  label?: string;
} & BoxProps) {
  const t = useTranslations();
  const dir = useDir();

  return (
    <Box {...other}>
      <FormLabel>{t(label)}</FormLabel>
      <RHFTextField
        name={name}
        placeholder="123 456 789"
        InputProps={{
          [dir === "ltr" ? "startAdornment" : "endAdornment"]: (
            <Stack
              direction="row"
              alignItems="center"
              marginInlineEnd={1}
              dir="ltr"
            >
              <InputAdornment position={dir === "ltr" ? "start" : "end"}>
                <Iconify icon="twemoji:flag-yemen" />
              </InputAdornment>
              <Typography color="text.secondary">+967</Typography>
            </Stack>
          ),
          inputProps: {
            dir: "ltr",
          },
        }}
      />
    </Box>
  );
}

export const phoneSchema = (yup: typeof Yup, t: (key: string) => string) =>
  yup
    .string()
    .required(t("Global.Error.phone_required"))
    .test(
      "only digits",
      t("Global.Error.phone_only_digits"),
      (value): boolean | void => !!/^\d+$/.test(value)
    )
    .min(9, t("Global.Error.phone_digits"))
    .max(9, t("Global.Error.phone_digits"))
    .test(
      "start with 7",
      t("Global.Error.phone_start_with_7"),
      (value): boolean | void => !!value.startsWith("7")
    );

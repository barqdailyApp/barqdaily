"use client";

import * as Yup from "yup";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Link, Divider, Checkbox, FormLabel } from "@mui/material";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { COOKIES_KEYS } from "@/config-global";
import { sendOtp } from "@/actions/auth-methods";

import Iconify from "@/components/iconify";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, { RHFTextField } from "@/components/hook-form";

import { LoginSteps } from "@/types/auth";
import { useDir } from "@/routes/hooks/use-dir";

export default function LoginPhoneStep({
  handleStepChange,
  phoneNumber,
  agree,
  handlePhone,
  handleAgree,
}: {
  handleStepChange: (stepVal: LoginSteps) => void;
  phoneNumber: string;
  agree: boolean;
  handlePhone: (newNumber: string) => void;
  handleAgree: (value: boolean) => void;
}) {
  const t = useTranslations();
  const dir = useDir();
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .min(9, t("Global.Error.phone_invalid"))
      .max(9, t("Global.Error.phone_invalid"))
      .required(t("Global.Error.phone_required")),
    agree: Yup.bool().oneOf([true]).required(),
  });
  const defaultValues = {
    phoneNumber,
    agree,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await sendOtp(`+967${data.phoneNumber.trim()}`);

      enqueueSnackbar(t("Global.Message.otp_sent"));

      handlePhone(data.phoneNumber);
      handleAgree(data.agree);
      handleStepChange(LoginSteps.otp);
    } catch (err: any) {
      enqueueSnackbar(err, { variant: "error" });
    }
  });

  const renderHead = (
    <Typography variant="h4" mb={2}>
      {t("Pages.Auth.login_title")}
    </Typography>
  );
  return (
    <>
      {renderHead}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <Box>
            <FormLabel>{t("Global.Label.phone")}</FormLabel>
            <RHFTextField
              name="phoneNumber"
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
          <Stack direction="row" alignItems="center" justifyContent="start">
            <Checkbox
              color="default"
              checked={watch("agree")}
              onChange={(e, value) => setValue("agree", value)}
              sx={{ color: errors?.agree ? "error.main" : undefined }}
            />
            <Typography
              variant="body2"
              color={errors?.agree ? "error.main" : "text.secondary"}
            >
              {t.rich("Pages.Auth.policies", {
                terms: (chunks) => (
                  <Link
                    href="#"
                    color="text.primary"
                    fontWeight="bold"
                    component={RouterLink}
                  >
                    {chunks}
                  </Link>
                ),
                privacy: (chunks) => (
                  <Link
                    href="#"
                    color="text.primary"
                    fontWeight="bold"
                    component={RouterLink}
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </Typography>
          </Stack>

          <LoadingButton
            fullWidth
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t("Pages.Auth.login_submit")}
          </LoadingButton>

          {(getCookie(COOKIES_KEYS.expiryTime) || phoneNumber) && (
            <Button
              size="large"
              color="primary"
              type="button"
              onClick={() => {
                handleStepChange(LoginSteps.otp);
              }}
            >
              {t("Pages.Auth.otp_back_reverse")}
            </Button>
          )}

          <Divider flexItem />

          <Typography variant="caption" color="text.secondary">
            {t.rich("Pages.Auth.redirect_to_register", {
              link: (chunks) => (
                <Link
                  href={paths.auth.jwt.register}
                  color="text.primary"
                  fontWeight="bold"
                  component={RouterLink}
                >
                  {chunks}
                </Link>
              ),
            })}
          </Typography>
        </Stack>
      </FormProvider>
    </>
  );
}

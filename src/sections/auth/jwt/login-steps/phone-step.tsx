"use client";

import * as Yup from "yup";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, Checkbox, Divider, FormLabel, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { COOKIES_KEYS } from "@/config-global";
import { sendOtp } from "@/actions/auth-methods";

import Iconify from "@/components/iconify";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, { RHFTextField } from "@/components/hook-form";

import { LoginSteps } from "@/types/auth";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

export default function LoginPhoneStep({
  handleStepChange,
  phoneNumber,
  handlePhone,
}: {
  handleStepChange: (stepVal: LoginSteps) => void;
  phoneNumber: string;
  handlePhone: (newNumber: string) => void;
}) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .min(6, t("Global.Error.phone_invalid"))
      .max(6, t("Global.Error.phone_invalid"))
      .required(t("Global.Error.phone_required")),
    agree: Yup.bool().oneOf([true]).required(),
  });
  const defaultValues = {
    phoneNumber,
    agree: false,
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
    const res = await sendOtp(`+967${data.phoneNumber.trim()}`);
    if ("error" in res) {
      enqueueSnackbar(res.error, { variant: "error" });
      return;
    }
    enqueueSnackbar(t("Global.Message.otp_sent"));
    handlePhone(data.phoneNumber);
    handleStepChange(LoginSteps.otp);
  });

  const renderHead = (
    <Typography variant="h4" mb={5}>
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
              placeholder="123456"
              InputProps={{
                startAdornment: (
                  <Stack
                    direction="row"
                    alignItems="center"
                    marginInlineEnd={1}
                  >
                    <InputAdornment position="start">
                      <Iconify icon="twemoji:flag-yemen" />
                    </InputAdornment>
                    <Typography color="text.secondary">+967</Typography>
                  </Stack>
                ),
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

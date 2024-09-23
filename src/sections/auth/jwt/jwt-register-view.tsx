"use client";

import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Link, Divider, Checkbox, FormLabel } from "@mui/material";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { register } from "@/actions/auth-methods";

import Iconify from "@/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required(t("Global.Error.name_required")),
    phoneNumber: Yup.string()
      .min(6, t("Global.Error.phone_invalid"))
      .max(6, t("Global.Error.phone_invalid"))
      .required(t("Global.Error.phone_required")),
    agree: Yup.bool().oneOf([true]).required(),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const res = await register({
      phone: `+967${data.phoneNumber.trim()}`,
      name: data.name,
    });
    if ("error" in res) {
      enqueueSnackbar(Array.isArray(res.error) ? res.error[0] : res.error, {
        variant: "error",
      });
      return;
    }
    router.push(paths.auth.jwt.login);
  });

  const renderHead = (
    <Typography variant="h4" mb={2}>
      {t("Pages.Auth.register_title")}
    </Typography>
  );

  return (
    <>
      {renderHead}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <Box>
            <FormLabel>{t("Global.Label.your_name")}</FormLabel>
            <RHFTextField name="name" placeholder={t("Global.Label.name")} />
          </Box>
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
            {t("Pages.Auth.register_submit")}
          </LoadingButton>

          <Divider flexItem />

          <Typography variant="caption" color="text.secondary">
            {t.rich("Pages.Auth.redirect_to_login", {
              link: (chunks) => (
                <Link
                  href={paths.auth.jwt.login}
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

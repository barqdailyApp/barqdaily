"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import LoadingButton from "@mui/lab/LoadingButton";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField, RHFMultiSelect } from "@/components/hook-form";

export default function NotificationsForm() {
  const defaultValues: { userType: string[]; title: string; body: string } = {
    userType: [],
    title: "",
    body: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const t = useTranslations();

  return (
    <FormProvider methods={methods} onSubmit={() => {}}>
      <Card
        sx={{
          p: 2,
        }}
      >
        <CardHeader title={t("GLOBAL.SIDEBAR.NOTIFICATIONS")} />
        <CardContent>
          <Grid
            container
            sx={{
              display: "grid",
              gap: 2,
            }}
          >
            <Grid item>
              <RHFMultiSelect
                checkbox
                label={t("GLOBAL.LABEL.USERTYPE")}
                fullWidth
                name="userType"
                options={userTypeOptions.map((x) => ({
                  ...x,
                  label: t(x.label),
                }))}
              />
            </Grid>
            <Grid item>
              <RHFTextField name="title" label={t("GLOBAL.LABEL.TITLE")} />
            </Grid>
            <Grid item>
              <RHFTextField name="body" multiline rows={5} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <LoadingButton
            sx={{
              backgroundColor: "#4040F2",
              color: "primary.contrastText",
            }}
          >
            {t("GLOBAL.BUTTON.SEND")}
          </LoadingButton>
        </CardActions>
      </Card>
    </FormProvider>
  );
}

const userTypeOptions = [
  {
    label: "GLOBAL.LABEL.COACH",
    value: "1",
  },
  {
    label: "GLOBAL.TITLE.TRAINEE",
    value: "2",
  },
];

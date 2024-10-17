import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { Link, Stack, Checkbox, Typography } from "@mui/material";

import { RouterLink } from "@/routes/components";

export default function AuthAgreePolicyField({
  name = "agree",
}: {
  name?: string;
}) {
  const t = useTranslations();

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack direction="row" alignItems="center" justifyContent="start">
      <Checkbox
        color="default"
        checked={watch(name)}
        onChange={(e, value) => setValue("agree", value)}
        sx={{ color: errors?.[name] ? "error.main" : undefined }}
      />
      <Typography
        variant="body2"
        color={errors?.[name] ? "error.main" : "text.secondary"}
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
  );
}

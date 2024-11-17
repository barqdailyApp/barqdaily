import RouterLink from "next/link";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { Link, Stack, Checkbox, Typography } from "@mui/material";

import { paths } from "@/routes/paths";

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
              href={paths.static.terms}
              color="text.primary"
              fontWeight="bold"
              component={RouterLink}
              target="_blank"
            >
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link
              href={paths.static.privacy}
              color="text.primary"
              fontWeight="bold"
              component={RouterLink}
              target="_blank"
            >
              {chunks}
            </Link>
          ),
        })}
      </Typography>
    </Stack>
  );
}

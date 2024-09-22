import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { paths } from "@/routes/paths";

import Label from "@/components/label";
import Iconify from "@/components/iconify";
import SvgColor from "@/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string, type?: "PUBLIC" | "ICONIFY") =>
  type === "ICONIFY" ? (
    <Iconify icon="fluent:mail-24-filled" />
  ) : (
    <SvgColor
      src={`/assets/icons/navbar/${name}.svg`}
      sx={{ width: 1, height: 1 }}
    />
  );

const ICONS = {
  product: icon("ic_product"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const t = useTranslations("Navbar");

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t("Overview.subheader"),
        items: [
          {
            title: t("Overview.App.title"),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
            info: (
              <Label
                color="info"
                startIcon={icon("solar:bell-bing-bold-duotone", "ICONIFY")}
              >
                {t("Overview.App.label")}
              </Label>
            ),
            roles: ["admin", "manager"],
            caption: t("Overview.App.caption"),
          },
          {
            title: t("Overview.Ecommerce.title"),
            path: paths.dashboard.root,
            icon: ICONS.ecommerce,
            disabled: true,
          },
          {
            title: t("Overview.Analytics.title"),
            path: paths.dashboard.root,
            icon: ICONS.analytics,
            info: <Label color="success">+32</Label>,
          },

          // PRODUCT
          {
            title: t("Overview.Product.title"),
            path: paths.dashboard.root,
            icon: ICONS.product,
            children: [
              {
                title: t("Overview.Product.List.title"),
                path: paths.dashboard.root,
              },
              {
                title: t("Overview.Product.Details.title"),
                path: paths.dashboard.root,
              },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}

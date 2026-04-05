"use client";

import { useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  Palette,
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { useSettingsContext } from "@/components/settings";

// system
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
// options
import RTL from "./options/right-to-left";
import { customShadows } from "./custom-shadows";
import { componentsOverrides } from "./overrides";
import NextAppDirEmotionCacheProvider from "./next-emotion-cache";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const settings = useSettingsContext();

  const paletteObj = palette(settings.themeMode) as unknown as Palette;

  const memoizedTheme = useMemo(
    () => ({
      palette: paletteObj,
      customShadows: customShadows(settings.themeMode, paletteObj),
      direction: settings.themeDirection,
      shadows: shadows(settings.themeMode),
      shape: { borderRadius: 8 },
      typography,
    }),
    [paletteObj, settings.themeMode, settings.themeDirection],
  );

  const theme = createTheme(memoizedTheme);

  theme.components = componentsOverrides(theme);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={theme}>
        <RTL themeDirection={settings.themeDirection}>
          <CssBaseline />
          {children}
        </RTL>
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}

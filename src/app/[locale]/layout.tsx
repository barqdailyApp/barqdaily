import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import ThemeProvider from "@/theme";
import { primaryFont } from "@/theme/typography";
import LocalizationProvider from "@/i18n/localization-provider";
import { locales, LocaleType, localesSettings } from "@/i18n/config-locale";

import { MotionLazy } from "@/components/animate/motion-lazy";
import ProgressBar from "@/components/progress-bar/progress-bar";
import SnackbarProvider from "@/components/snackbar/snackbar-provider";
import { SettingsDrawer, SettingsProvider } from "@/components/settings";
import { AuthProvider } from "@/auth/context/jwt";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: LocaleType };
}) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  const { dir } = localesSettings[locale];

  return (
    <html lang={locale} dir={dir} className={primaryFont.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <LocalizationProvider>
              <SettingsProvider
                defaultSettings={{
                  themeMode: "light", // 'light' | 'dark'
                  themeDirection: dir, //  'rtl' | 'ltr'
                  themeContrast: "default", // 'default' | 'bold'
                  themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
                  themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                  themeStretch: false,
                }}
              >
                <ThemeProvider>
                  <SnackbarProvider>
                    <MotionLazy>
                      <SettingsDrawer />
                      <ProgressBar />
                      {children}
                    </MotionLazy>
                  </SnackbarProvider>
                </ThemeProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

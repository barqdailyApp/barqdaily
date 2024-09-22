"use client";

import isEqual from "lodash/isEqual";
import { useLocale } from "next-intl";
import { useMemo, useState, useEffect, useCallback } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";

import { LocaleType, localesSettings } from "@/i18n/config-locale";

import { SettingsValueProps } from "../types";
import { SettingsContext } from "./settings-context";

// ----------------------------------------------------------------------

const STORAGE_KEY = "settings";

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(
    STORAGE_KEY,
    defaultSettings
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (newLocale: LocaleType) => {
      update("themeDirection", localesSettings[newLocale].dir);
    },
    [update]
  );

  const locale = useLocale();
  useEffect(() => {
    onChangeDirectionByLang(locale as LocaleType);
  }, [locale, onChangeDirectionByLang]);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      reset,
      update,
      state,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
    ]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}

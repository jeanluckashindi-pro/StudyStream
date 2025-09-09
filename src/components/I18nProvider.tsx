"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useEffect, useState } from "react";

// Import des traductions
import fr from "../lib/locales/fr.json";
import en from "../lib/locales/en.json";

const resources = {
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
};

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [instance, setInstance] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initI18n = async () => {
      const i18n = createInstance();

      await i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources,
          fallbackLng: "fr",
          debug: process.env.NODE_ENV === "development",
          initImmediate: false,

          interpolation: {
            escapeValue: false,
          },

          detection: {
            order: ["localStorage", "navigator", "htmlTag"],
            caches: ["localStorage"],
          },
        });

      setInstance(i18n);
      setMounted(true);
    };

    initI18n();
  }, []);

  if (!mounted || !instance) {
    return <div className="min-h-screen bg-background" />;
  }

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}

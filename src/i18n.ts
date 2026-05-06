// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// // Import translation files
// import enTranslations from "./locales/en/translation.json";
// import arTranslations from "./locales/ar/translation.json";

// // Initialize i18next
// i18n
//   .use(initReactI18next) // Pass i18next to react-i18next
//   .init({
//     resources: {
//       en: {
//         translation: enTranslations,
//       },
//       ar: {
//         translation: arTranslations,
//       },
//     },
//     lng: "en", // Default language
//     fallbackLng: "en", // Fallback language if the translation is not available
//     interpolation: {
//       escapeValue: false, // React already does escaping
//     },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en/translation.json";
import arTranslations from "./locales/ar/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;

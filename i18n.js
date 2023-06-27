import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "vi", "cn"], // Danh sách các ngôn ngữ được hỗ trợ
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "src/translations/{{lng}}.json", // Specify the path pattern for loading translation files
    },
  });

export default i18n;

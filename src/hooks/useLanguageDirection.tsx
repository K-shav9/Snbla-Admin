import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLanguageDirection = () => {
  const { i18n } = useTranslation();

  // Change direction based on language (LTR/RTL)
  useEffect(() => {
    if (i18n.language === "ar") {
      document.body.dir = "rtl"; // Set RTL for Arabic
    } else {
      document.body.dir = "ltr"; // Set LTR for English
    }
  }, [i18n.language]);

  // Function to change language
  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };


  return changeLanguage;
};

export default useLanguageDirection;

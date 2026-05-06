// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// export const useLanguagePicker = () => {
//   const [lang, setLang] = useState<any>();

//   const { i18n } = useTranslation();

//   // Change direction based on language (LTR/RTL)
//   useEffect(() => {
//     if (i18n.language) {
//       setLang(i18n.language);
//     } else {
//       setLang(i18n.language);
//     }
//   }, [i18n.language]);

//   return lang;
// };

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useLanguagePicker = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  return lang;
};


import React, { useState } from 'react';
import useLanguageDirection from './hooks/useLanguageDirection';

const LanguageSwitch: React.FC = () => {
  const changeLanguage = useLanguageDirection();
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <>
      {/* <button
        className="border-2 px-2 py-1 mr-4"
        onClick={() => changeLanguage("en")}
      >
        English
      </button>
      <button
        className="border-2 px-2 py-1 ml-4"
        onClick={() => changeLanguage("ar")}
      >
        Arabic
      </button> */}

      <div className="switch-main">
        <div className="switch-container" onClick={toggleLanguage}>
          <div
            className={`switch ${
              language === "ar" ? "switch-ar" : "switch-en"
            }`}
          >
            <span className="switch-text">
              {language === "en" ? "EN" : "AR"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSwitch;

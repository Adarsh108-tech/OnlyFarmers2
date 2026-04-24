"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // Default to English
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference on mount
    const savedLang = localStorage.getItem("app_language");
    if (savedLang && (savedLang === "en" || savedLang === "hi")) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("app_language", lang);
  };

  const t = (key) => {
    // Return translation based on current language, fallback to English, then to the key itself
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>; 
    // Or return null if you don't mind a brief flash, 
    // but returning children is better for SEO (SSR will be in English)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Fallback if used outside provider (e.g. during SSR)
    return { language: "en", changeLanguage: () => {}, t: (key) => translations["en"]?.[key] || key };
  }
  return context;
}

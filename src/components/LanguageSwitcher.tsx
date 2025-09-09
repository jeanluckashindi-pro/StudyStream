"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface LanguageOption {
  name: string;
  code: string;
  country: string;
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const languages: LanguageOption[] = [
    { name: "English", code: "en", country: "United States" },
    { name: "Français", code: "fr", country: "France" },
  ];

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  // Initialiser la langue sélectionnée
  React.useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: 160,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          border: "1px solid #495057",
          borderRadius: "8px",
          "& fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
        },
        "& .MuiSelect-select": {
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          padding: "8px 12px",
          fontFamily: "'Josefin Sans', sans-serif",
        },
        "& .MuiSvgIcon-root": {
          color: "#ADB5BD",
        },
      }}
    >
      <Select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#343A40",
              border: "1px solid #495057",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              marginTop: "4px",
              "& .MuiMenuItem-root": {
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                padding: "8px 12px",
                fontFamily: "'Josefin Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#495057",
                },
                "&.Mui-selected": {
                  backgroundColor: "#495057",
                  "&:hover": {
                    backgroundColor: "#495057",
                  },
                },
              },
            },
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            {language.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import Footer from "@/components/Footer";
import OptiAcadButton from "@/components/OptiAcadButton";
import OptiAcadLink from "@/components/OptiAcadLink";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion à implémenter
    console.log("Login attempt:", { email, password, rememberPassword });
  };

  return (
    <>
      {/* Background sombre */}
      <div className="flex items-center justify-center p-4">
        {/* Carte centrale */}
        <div
          className="rounded-xl shadow-2xl w-full max-w-md p-8 relative border"
          style={{ borderColor: "var(--gray-600)" }}
        >
          {/* Header OptiAcad */}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-3 mt-10">
            {/* Champ Email avec icône utilisateur */}
            <div className="input-with-user-icon">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.emailOrPhone")}
                required
              />
            </div>
            {/* Champ Password avec icône cadenas et toggle visibilité */}
            <div className="input-with-lock-icon relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.password")}
                required
                className="pr-12"
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--gray-400)",
                  "&:hover": {
                    backgroundColor: "rgba(156, 163, 175, 0.1)",
                  },
                }}
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {/* Checkbox Remember password et lien Forgot password en flex */}
            <div
              className="flex justify-between items-center"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberPassword}
                    onChange={(e) => setRememberPassword(e.target.checked)}
                    sx={{
                      color: "var(--gray-400)",
                      "&.Mui-checked": {
                        color: "var(--blue-400)",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(59, 130, 246, 0.04)",
                      },
                    }}
                  />
                }
                label={t("auth.rememberPassword")}
                sx={{
                  color: "var(--gray-300)",
                  fontSize: "14px",
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    color: "var(--gray-300)",
                  },
                }}
              />
              <OptiAcadLink
                href="/forgot-password"
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: "var(--blue-600)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--blue-700)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--blue-600)";
                }}
              >
                {t("auth.forgotPassword")}
              </OptiAcadLink>
            </div>
            {/* Bouton de connexion */}
            <div className="pt-2">
              <OptiAcadButton type="submit" width="full">
                {t("auth.loginButton")}
              </OptiAcadButton>
            </div>
          </form>

          {/* Footer de la carte */}
          <div
            className="mt-6 pt-4 border-t"
            style={{
              marginTop: "20px",
              borderColor: "var(--gray-600)",
            }}
          >
            <div
              className="flex justify-center text-xs"
              style={{ color: "var(--gray-400)" }}
            >
              <span
                className="transition-colors duration-200"
                style={{ color: "var(--gray-400)" }}
              >
                {t("auth.platformDescription")}
              </span>
            </div>
          </div>
        </div>

        {/* Logo en bas à gauche */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: "var(--gray-800)",
              borderColor: "var(--gray-600)",
            }}
          >
            <span
              className="font-bold text-lg"
              style={{ color: "var(--feedback-text)" }}
            >
              N
            </span>
          </div>
        </div>

        {/* Language Switcher en bas à droite */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
          }}
        >
          <LanguageSwitcher />
        </div>
      </div>
      <Footer />
    </>
  );
}

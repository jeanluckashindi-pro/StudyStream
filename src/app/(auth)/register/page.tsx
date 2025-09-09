"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Steps } from "primereact/steps";
import Link from "next/link";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import Footer from "@/components/Footer";
import OptiAcadButton from "@/components/OptiAcadButton";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const steps = [
    {
      icon: "pi pi-id-card",
      label: t("auth.step1"),
      fields: ["firstName", "lastName"],
    },
    {
      icon: "pi pi-phone",
      label: t("auth.step2"),
      fields: ["email", "phone"],
    },
    {
      icon: "pi pi-key",
      label: t("auth.step3"),
      fields: ["password", "confirmPassword"],
    },
    {
      icon: "pi pi-mobile",
      label: t("auth.otpTitle"),
      fields: ["otp"],
    },
    {
      icon: "pi pi-check-circle",
      label: t("auth.step4"),
      fields: ["terms"],
    },
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (activeStep === 1) {
      // Validation spéciale pour l'email avant l'étape de vérification
      if (!validateEmail(formData.email)) {
        setEmailError(t("auth.invalidEmail"));
        return;
      }
      setEmailError("");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription à implémenter
    console.log("Register attempt:", formData);
  };

  const generateStrongPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      if (field === "email") {
        setEmailError("");
      }
    };

  const canProceedToNext = () => {
    switch (activeStep) {
      case 0:
        return formData.firstName && formData.lastName;
      case 1:
        return (
          formData.email && formData.phone && validateEmail(formData.email)
        );
      case 2:
        return (
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 3:
        return formData.otp && formData.otp.length === 6;
      case 4:
        return acceptTerms;
      default:
        return false;
    }
  };

  const canNavigateToStep = (stepIndex: number) => {
    // L'utilisateur ne peut naviguer que vers les étapes déjà validées ou l'étape actuelle
    if (stepIndex > activeStep) {
      return false; // Pas de navigation vers les étapes futures
    }

    // Vérifier que l'étape précédente est validée
    for (let i = 0; i < stepIndex; i++) {
      switch (i) {
        case 0:
          if (!formData.firstName || !formData.lastName) return false;
          break;
        case 1:
          if (
            !formData.email ||
            !formData.phone ||
            !validateEmail(formData.email)
          )
            return false;
          break;
        case 2:
          if (
            !formData.password ||
            !formData.confirmPassword ||
            formData.password !== formData.confirmPassword
          )
            return false;
          break;
        case 3:
          if (!formData.otp || formData.otp.length !== 6) return false;
          break;
      }
    }
    return true;
  };

  const itemRenderer = (item: { icon: string }, itemIndex: number) => {
    const isActiveItem = activeStep === itemIndex;
    const isCompleted = activeStep > itemIndex;
    const canNavigate = canNavigateToStep(itemIndex);

    return (
      <div
        className={`flex flex-col items-center ${
          canNavigate ? "cursor-pointer" : "cursor-not-allowed opacity-50"
        }`}
        onClick={canNavigate ? () => setActiveStep(itemIndex) : undefined}
        style={{ minWidth: "80px" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200"
          style={{
            backgroundColor: isActiveItem
              ? "var(--blue-400)"
              : isCompleted
              ? "var(--blue-500)"
              : "var(--gray-800)",
            borderColor: isActiveItem
              ? "var(--blue-400)"
              : isCompleted
              ? "var(--blue-500)"
              : "var(--gray-600)",
            color: isActiveItem || isCompleted ? "white" : "var(--gray-400)",
          }}
        >
          <i className={`${item.icon} text-lg`} />
        </div>
        <div
          className="text-xs mt-2 text-center"
          style={{
            color: isActiveItem
              ? "var(--blue-400)"
              : isCompleted
              ? "var(--blue-500)"
              : "var(--gray-400)",
            fontWeight: isActiveItem ? "600" : "400",
          }}
        >
          {steps[itemIndex].label}
        </div>
      </div>
    );
  };

  const items = steps.map((step, index) => ({
    icon: step.icon,
    template: () => itemRenderer({ icon: step.icon }, index),
  }));

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-3">
            {/* Champ Prénom avec icône utilisateur */}
            <div className="input-with-user-icon">
              <input
                type="text"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                placeholder={t("auth.firstName")}
                required
              />
            </div>

            {/* Champ Nom avec icône utilisateur */}
            <div className="input-with-user-icon">
              <input
                type="text"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                placeholder={t("auth.lastName")}
                required
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-3">
            {/* Champ Email avec icône utilisateur */}
            <div className="input-with-user-icon">
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder={t("auth.email")}
                required
                className={emailError ? "border-red-500" : ""}
              />
              {emailError && (
                <div className="text-red-500 text-xs mt-1">{emailError}</div>
              )}
            </div>

            {/* Champ Téléphone avec icône téléphone */}
            <div className="input-with-phone-icon">
              <input
                type="tel"
                value={formData.phone}
                onChange={handleChange("phone")}
                placeholder={t("auth.phone")}
                required
              />
            </div>

            {/* Message d'information */}
            <div className="text-xs text-blue-400" style={{ margin: "10px 0" }}>
              {t("auth.emailVerificationInfo")}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            {/* Champ Password avec icône cadenas et toggle visibilité */}
            <div className="input-with-lock-icon relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange("password")}
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

            {/* Liens pour copier et générer le mot de passe */}
            <div
              className="flex justify-between items-center"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              {formData.password && (
                <button
                  type="button"
                  className="text-sm font-medium transition-colors duration-200"
                  style={{
                    color: "var(--blue-600)",
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => copyToClipboard(formData.password)}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "var(--blue-700)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "var(--blue-600)";
                  }}
                >
                  <i className="pi pi-copy" style={{ marginRight: "4px" }}></i>
                  Copier le mot de passe
                </button>
              )}
              <button
                type="button"
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: "var(--blue-600)",
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={generateStrongPassword}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--blue-700)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--blue-600)";
                }}
              >
                <i className="pi pi-refresh" style={{ marginRight: "4px" }}></i>
                Générer un mot de passe
              </button>
            </div>

            {/* Message de confirmation de copie */}
            {showCopiedMessage && (
              <div className="text-center text-xs text-green-400 mt-2">
                Mot de passe copié !
              </div>
            )}

            {/* Champ Confirm Password avec icône cadenas et toggle visibilité */}
            <div className="input-with-lock-icon relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder={t("auth.confirmPassword")}
                required
                className="pr-12"
              />
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {/* Message d'information OTP */}
            <div className="text-center mb-4">
              <p className="text-sm" style={{ color: "var(--gray-300)" }}>
                {t("auth.otpMessage")}
              </p>
            </div>

            {/* Champ OTP avec 6 cases */}
            <div
              className="flex justify-center"
              style={{ gap: "12px", margin: "10px 0" }}
            >
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    maxLength={1}
                    value={formData.otp[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 1) {
                        const newOtp = formData.otp.split("");
                        newOtp[index] = value;
                        setFormData({ ...formData, otp: newOtp.join("") });

                        // Auto-focus sur le champ suivant
                        if (value && index < 5) {
                          const nextInput = (
                            e.target as HTMLElement
                          ).parentElement?.nextElementSibling?.querySelector(
                            "input"
                          );
                          if (nextInput) nextInput.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      // Permettre la navigation avec les flèches et backspace
                      if (
                        e.key === "Backspace" &&
                        !formData.otp[index] &&
                        index > 0
                      ) {
                        const prevInput = (
                          e.target as HTMLElement
                        ).parentElement?.previousElementSibling?.querySelector(
                          "input"
                        );
                        if (prevInput) prevInput.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-lg font-bold border rounded-md bg-transparent transition-all duration-200"
                    style={{
                      borderColor: "var(--gray-600)",
                      color: "white",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--blue-400)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--gray-600)";
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Bouton renvoyer le code */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: "var(--blue-600)",
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--blue-700)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--blue-600)";
                }}
              >
                {t("auth.resendCode")}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-3">
            {/* Checkbox Accept terms */}
            <div className="flex justify-start items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
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
                label={t("auth.acceptTerms")}
                sx={{
                  color: "var(--gray-300)",
                  fontSize: "14px",
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    color: "var(--gray-300)",
                  },
                }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
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
          {/* PrimeReact Steps - Positionné en haut */}
          <div className="mb-8">
            <div className="flex justify-between items-center px-4">
              {steps.map((step, index) => (
                <div key={`step-${index}`}>
                  {itemRenderer({ icon: step.icon }, index)}
                </div>
              ))}
            </div>
            {/* Ligne de connexion entre les steps */}
            <div className="relative mt-6">
              <div
                className="absolute top-0 left-0 h-0.5 transition-all duration-300"
                style={{
                  width: `${((activeStep + 1) / steps.length) * 100}%`,
                  backgroundColor: "var(--blue-400)",
                }}
              />
              <div className="h-0.5 bg-gray-600" />
            </div>
          </div>
          <div
            className="m-10 text-center flex justify-center items-center"
            style={{ margin: "20px" }}
          >
            <h1 className="text-3xl font-bold">{t("auth.newAccount")}</h1>
          </div>
          {/* Texte d'information */}
          <div className="mb-6 text-center text-sm" style={{ margin: "20px" }}>
            <span
              className="transition-colors duration-200"
              style={{ color: "var(--gray-400)" }}
            >
              {t("auth.registrationInfo")}
            </span>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent(activeStep)}

            {/* Boutons de navigation */}
            <div className="flex justify-between pt-4">
              <OptiAcadButton
                onClick={handleBack}
                disabled={activeStep === 0}
                width="auto"
              >
                {t("auth.previous")}
              </OptiAcadButton>

              {activeStep === steps.length - 1 ? (
                <OptiAcadButton
                  type="submit"
                  disabled={!canProceedToNext()}
                  width="auto"
                >
                  {t("auth.registerButton")}
                </OptiAcadButton>
              ) : (
                <OptiAcadButton
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  width="auto"
                >
                  {t("auth.next")}
                </OptiAcadButton>
              )}
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
                {t("auth.alreadyHaveAccount")}{" "}
                <Link
                  href="/login"
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
                  {t("auth.goToLogin")}
                </Link>
              </span>
            </div>

            {/* Bulles de progression en bas */}
            <div
              className="flex justify-center"
              style={{ marginTop: "20px", gap: "20px" }}
            >
              {steps.map((step, index) => (
                <div
                  key={`progress-${index}`}
                  className={`h-1 rounded-full transition-all duration-700 ease-in-out ${
                    index <= activeStep ? "bg-blue-400 w-8" : "bg-gray-600 w-4"
                  }`}
                  style={{
                    transform:
                      index <= activeStep ? "scaleX(1.2)" : "scaleX(1)",
                    transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              ))}
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

"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import Footer from "@/components/Footer";
import OptiAcadButton from "@/components/OptiAcadButton";
import OptiAcadLink from "@/components/OptiAcadLink";

const items = ["Slide 1", "Slide 2", "Slide 3"];

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState("");
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      icon: "pi pi-envelope",
      label: "Email",
      fields: ["email"],
    },
    {
      icon: "pi pi-mobile",
      label: "Code OTP",
      fields: ["otp"],
    },
    {
      icon: "pi pi-key",
      label: "Nouveau mot de passe",
      fields: ["newPassword", "confirmPassword"],
    },
    {
      icon: "pi pi-check-circle",
      label: "Validation",
      fields: ["validation"],
    },
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (activeStep === 0) {
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
    console.log("Password reset:", formData);
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
        return formData.email && validateEmail(formData.email);
      case 1:
        return formData.otp && formData.otp.length === 6;
      case 2:
        return (
          formData.newPassword &&
          formData.confirmPassword &&
          formData.newPassword === formData.confirmPassword
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const canNavigateToStep = (stepIndex: number) => {
    return stepIndex <= activeStep;
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

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            {/* Message d'information */}

            <div
              className="flex justify-center text-xs text-center"
              style={{ color: "var(--gray-400)", margin: "10px" }}
            >
              <span
                className="transition-colors duration-200"
                style={{
                  color: "var(--gray-400)",
                }}
              >
                {t("auth.forgotPasswordDescription")}
              </span>
            </div>

            {/* Champ Email avec icône utilisateur */}
            <div className="input-with-user-icon">
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder={t("auth.email")}
                required
              />
            </div>

            {/* Message d'erreur email */}
            {emailError && (
              <div className="text-center text-xs text-red-400">
                {emailError}
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            {/* Message d'information OTP */}
            <div className="text-center mb-4" style={{ margin: "10px" }}>
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

      case 2:
        return (
          <div className="space-y-4">
            {/* Champ Nouveau mot de passe */}
            <div className="input-with-lock-icon relative">
              <input
                type="password"
                value={formData.newPassword}
                onChange={handleChange("newPassword")}
                placeholder={t("auth.password")}
                required
              />
            </div>

            {/* Champ Confirmer le mot de passe */}
            <div className="input-with-lock-icon relative">
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder={t("auth.confirmPassword")}
                required
              />
            </div>

            {/* Message de validation */}
            {formData.confirmPassword &&
              formData.newPassword !== formData.confirmPassword && (
                <div className="text-center text-xs text-red-400">
                  Les mots de passe ne correspondent pas
                </div>
              )}
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-4">
            {/* Icône de succès PrimeReact */}
            <div className="text-6xl mb-4">
              <i
                className="pi pi-check-circle"
                style={{ color: "var(--blue-400)" }}
              ></i>
            </div>

            {/* Message de succès */}
            <h2 className="text-xl font-semibold" style={{ color: "white" }}>
              {t("auth.resetEmailSent")}
            </h2>

            <p className="text-sm" style={{ color: "var(--gray-300)" }}>
              {t("auth.checkEmailInstructions")}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + items.length) % items.length);

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
            <h1 className="text-3xl font-bold">{t("auth.title")}</h1>
          </div>
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent(activeStep)}
            <div className="flex justify-between pt-4">
              <OptiAcadButton
                onClick={() => handleBack()}
                disabled={activeStep === 0}
                width="auto"
                type="button"
              >
                {t("auth.previous")}
              </OptiAcadButton>
              {activeStep === steps.length - 1 ? (
                <OptiAcadLink href="/login">
                  <OptiAcadButton width="auto" type="button">
                    {t("auth.backToLogin")}
                  </OptiAcadButton>
                </OptiAcadLink>
              ) : (
                <OptiAcadButton
                  onClick={() => {
                    if (canProceedToNext()) handleNext();
                  }}
                  disabled={!canProceedToNext()}
                  width="auto"
                  type="button"
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
                {t("auth.platformDescription")}
              </span>
            </div>

            {/* Lien vers la connexion */}
            <div
              className="flex justify-center text-xs mt-2 items-center"
              style={{ color: "var(--gray-400)", margin: "10px", gap: "10px" }}
            >
              <span style={{ color: "var(--gray-400)" }}>
                {t("auth.alreadyHaveAccount")}{" "}
              </span>
              <OptiAcadLink
                href="/login"
                className="transition-colors duration-200"
                style={{
                  color: "var(--blue-400)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--blue-500)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--blue-400)";
                }}
              >
                {t("auth.loginButton")}
              </OptiAcadLink>
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

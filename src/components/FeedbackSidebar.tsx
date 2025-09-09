"use client";

import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import OptiAcadButton from "./OptiAcadButton";

interface FeedbackSidebarProps {
  visible: boolean;
  onHide: () => void;
}

export default function FeedbackSidebar({
  visible,
  onHide,
}: FeedbackSidebarProps) {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState("");
  const [includeScreenshot, setIncludeScreenshot] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Feedback submitted:", {
      feedback,
      includeScreenshot,
      emailUpdates,
      email,
    });
    setFeedback("");
    setIncludeScreenshot(false);
    setEmailUpdates(false);
    setEmail("");
    onHide();
  };

  return (
    <Sidebar
      visible={visible}
      position="right"
      showCloseIcon={false}
      onHide={onHide}
      style={{
        backgroundColor: "var(--feedback-bg)",
        fontFamily: "Roboto, Arial, sans-serif",
        width: "30vw",
      }}
    >
      <div
        className="p-3"
        style={{
          height: "100vh",
          overflowY: "auto",
          maxWidth: "100%",
          boxSizing: "border-box",
          color: "var(--feedback-text)",
          padding: "8px",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-xl font-medium"
            style={{ fontSize: "20px", fontWeight: "500" }}
          >
            {t("feedback.title")}
          </h2>
        </div>

        {/* Feedback Input */}
        <div className="mb-8">
          <label
            className="block mb-3 font-medium"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--feedback-text)",
            }}
          ></label>
          <InputTextarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
            className="w-full"
            style={{
              backgroundColor: "var(--feedback-input-bg)",
              border: "1px solid var(--feedback-border)",
              color: "var(--feedback-text)",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "14px",
              fontFamily: "Roboto, Arial, sans-serif",
              resize: "none",
              marginTop: "10px",
            }}
            placeholder={t("feedback.placeholder")}
          />
        </div>

        {/* Email Input */}
        <div className="mb-8">
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--feedback-text)",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre adresse email"
            style={{
              width: "100%",
              backgroundColor: "var(--feedback-input-bg)",
              border: "1px solid var(--feedback-border)",
              color: "var(--feedback-text)",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "14px",
              fontFamily: "Roboto, Arial, sans-serif",
            }}
          />
        </div>

        {/* Email Updates */}
        <div className="mb-8">
          <FormControlLabel
            control={
              <Checkbox
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
                sx={{
                  color: "var(--feedback-text-muted)",
                  "&.Mui-checked": {
                    color: "var(--feedback-border)",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                  },
                }}
              />
            }
            label={t("feedback.emailUpdates")}
            sx={{
              margin: 0,
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                color: "var(--feedback-text-muted)",
              },
            }}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            position: "absolute",
            bottom: "calc(10% + 120px)",
            left: "5px",
            right: "5px",
            height: "1px",
            backgroundColor: "var(--dark-gray)",
          }}
        />

        {/* Legal Information */}
        <div
          className="text-sm leading-relaxed"
          style={{
            position: "absolute",
            bottom: "10%",
            left: "8px",
            right: "8px",
            fontSize: "12px",
            lineHeight: "1.5",
            color: "var(--feedback-text-muted)",
          }}
        >
          <p>
            {t("feedback.legalInfo.part1")}{" "}
            <span
              className="cursor-pointer"
              style={{ color: "var(--feedback-link)" }}
            >
              {t("feedback.legalInfo.accountInfo")}
            </span>{" "}
            {t("feedback.legalInfo.part2")}{" "}
            <span
              className="cursor-pointer"
              style={{ color: "var(--feedback-link)" }}
            >
              {t("feedback.legalInfo.privacyPolicy")}
            </span>{" "}
            {t("feedback.legalInfo.and")}{" "}
            <span
              className="cursor-pointer"
              style={{ color: "var(--feedback-link)" }}
            >
              {t("feedback.legalInfo.termsOfService")}
            </span>
            . {t("feedback.legalInfo.part3")}{" "}
            <span
              className="cursor-pointer"
              style={{ color: "var(--feedback-link)" }}
            >
              {t("feedback.legalInfo.legalHelp")}
            </span>{" "}
            {t("feedback.legalInfo.part4")}
          </p>
        </div>

        {/* Send Button */}
        <div
          className="flex justify-end"
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px",
            left: "32px",
          }}
        >
          <OptiAcadButton
            onClick={handleSubmit}
            disabled={!feedback.trim() || !email.trim()}
            width="auto"
            className="px-6 py-2.5 rounded-lg text-sm font-medium min-w-20"
          >
            {t("feedback.send")}
          </OptiAcadButton>
        </div>
      </div>
    </Sidebar>
  );
}

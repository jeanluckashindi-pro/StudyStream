import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import FeedbackSidebar from "./FeedbackSidebar";
import OptiAcadLink from "./OptiAcadLink";

const Footer = () => {
  const { t } = useTranslation();
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  return (
    <div
      className="absolute flex justify-center items-center"
      style={{
        position: "absolute",
        bottom: "0%",
        left: "0",
        right: "0",
        width: "100vw",
        height: "10vh",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-josefin-sans), sans-serif",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "0 16px",
        }}
      >
        <OptiAcadLink href="/privacy" style={{ color: "var(--feedback-text)" }}>
          {t("footer.privacy")}
        </OptiAcadLink>
        <span style={{ color: "var(--gray-400)" }}>|</span>
        <OptiAcadLink href="/terms" style={{ color: "var(--feedback-text)" }}>
          {t("footer.terms")}
        </OptiAcadLink>
        <span style={{ color: "var(--gray-400)" }}>|</span>
        <OptiAcadLink href="/help" style={{ color: "var(--feedback-text)" }}>
          {t("footer.help")}
        </OptiAcadLink>
        <span style={{ color: "var(--gray-400)" }}>|</span>
        <button
          onClick={() => setFeedbackVisible(true)}
          style={{
            color: "var(--feedback-text)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {t("footer.sendFeedback")}
        </button>
        <span style={{ color: "var(--gray-400)" }}>|</span>
        <span
          style={{
            color: "var(--feedback-text)",
          }}
        >
          Decima Company
        </span>
      </div>
      {/* Language Switcher */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 10,
        }}
      >
        <LanguageSwitcher />
      </div>

      {/* Feedback Sidebar */}
      <FeedbackSidebar
        visible={feedbackVisible}
        onHide={() => setFeedbackVisible(false)}
      />
    </div>
  );
};

export default Footer;

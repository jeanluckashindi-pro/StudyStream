import React from "react";

interface OptiAcadButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  width?: "full" | "auto" | "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "primary" | "card";
}

const OptiAcadButton: React.FC<OptiAcadButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  width = "auto",
  className = "",
  variant = "primary",
}) => {
  const widthClasses: Record<string, string> = {
    full: "w-full",
    auto: "w-auto",
    sm: "w-20", // ≈ 80px
    md: "w-40", // ≈ 160px
    lg: "w-56", // ≈ 224px
    xl: "w-72", // ≈ 288px
  };

  const getButtonStyle = () => {
    if (disabled) {
      return {
        backgroundColor: "#4B5563",
        color: "#9CA3AF",
      };
    }

    if (variant === "card") {
      return {
        backgroundColor: "var(--card)",
        color: "var(--gray-300)",
        border: "1px solid var(--gray-600)",
      };
    }

    return {
      backgroundColor: "var(--blue-600)",
      color: "white",
    };
  };

  return (
    <button
      style={{
        fontFamily: "var(--font-josefin-sans), sans-serif",
        ...getButtonStyle(),
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.2s ease-in-out",
        position: "relative",
        padding: "8px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        border: variant !== "card" ? "none" : undefined,
        borderRadius: "4px",
      }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`btn-facebook ${widthClasses[width]} ${className}`}
    >
      {children}
    </button>
  );
};

export default OptiAcadButton;

import React, { useState } from "react";
import NextLink, { LinkProps } from "next/link";

interface OptiAcadLinkProps extends LinkProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "card";
  style?: React.CSSProperties;
}

const OptiAcadLink: React.FC<OptiAcadLinkProps> = ({
  children,
  href,
  disabled = false,
  className = "",
  variant = "primary",
  style = {},
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulation de 2s
    if (rest.onClick) (rest.onClick as any)(e);
  };

  const getLinkStyle = () => {
    if (disabled) {
      return {
        color: "var(--gray-400)",
        pointerEvents: "none",
        textDecoration: "none",
      };
    }
    if (variant === "card") {
      return {
        color: "var(--gray-300)",
        backgroundColor: "var(--card)",
        border: "1px solid var(--gray-600)",
        padding: "8px 24px",
        borderRadius: "4px",
        textDecoration: "none",
      };
    }
    return {
      color: "var(--blue-600)",
    };
  };

  return (
    <NextLink
      href={href}
      className={className}
      style={{
        fontFamily: "var(--font-josefin-sans), sans-serif",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.2s ease-in-out",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        ...getLinkStyle(),
        ...style,
      }}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {loading && (
        <span
          className="google-spinner"
          style={{
            width: 18,
            height: 18,
            display: "inline-block",
          }}
        >
          <span className="google-spinner-circle" />
        </span>
      )}
      {children}
      <style>
        {`
          .google-spinner {
            position: relative;
            display: inline-block;
            vertical-align: middle;
          }
          .google-spinner-circle {
            box-sizing: border-box;
            display: block;
            width: 18px;
            height: 18px;
            border: 3px solid #4285f4;
            border-radius: 50%;
            border-top-color: transparent;
            animation: google-spin 0.7s linear infinite;
          }
          @keyframes google-spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </NextLink>
  );
};

export default OptiAcadLink;

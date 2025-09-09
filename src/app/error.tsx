"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import {
  Refresh as RefreshIcon,
  Home as HomeIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    // Log l'erreur pour le debugging
    console.error("Erreur côté client:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Paper elevation={3} className="p-8 bg-card max-w-lg w-full text-center">
        {/* Icône d'erreur */}
        <Box className="mb-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
              <WarningIcon className="text-white text-4xl" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-orange-800 text-sm font-bold">!</span>
            </div>
          </div>
        </Box>

        {/* Message d'erreur */}
        <Typography
          variant="h4"
          component="h1"
          className="text-foreground mb-4 font-bold"
        >
          {t("errors.500.title")}
        </Typography>

        <Typography variant="body1" className="text-foreground/70 mb-6">
          {t("errors.500.message")}
        </Typography>

        {/* Détails techniques (en développement) */}
        {process.env.NODE_ENV === "development" && (
          <Box className="bg-orange-500/10 rounded-lg p-4 mb-6 text-left">
            <Typography
              variant="body2"
              className="text-orange-600 font-mono text-sm"
            >
              <strong>Erreur :</strong> {error.message}
            </Typography>
            {error.digest && (
              <Typography
                variant="body2"
                className="text-orange-600 font-mono text-sm mt-2"
              >
                <strong>Digest :</strong> {error.digest}
              </Typography>
            )}
          </Box>
        )}

        {/* Actions de récupération */}
        <Box className="space-y-3">
          <Button
            onClick={reset}
            variant="contained"
            fullWidth
            size="large"
            startIcon={<RefreshIcon />}
            className="bg-dark-blue hover:bg-dark-blue/90"
          >
            {t("errors.500.retry")}
          </Button>

          <Button
            component={Link}
            href="/dashboard"
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<HomeIcon />}
            className="text-foreground border-foreground/20 hover:bg-foreground/5"
          >
            {t("errors.500.backToHome")}
          </Button>
        </Box>

        {/* Suggestions d'aide */}
        <Box className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
          <Typography variant="body2" className="text-foreground/80 mb-2">
            <strong>{t("errors.500.troubleshooting")}</strong>
          </Typography>
          <Typography variant="body2" className="text-foreground/70 text-sm">
            {(() => {
              const tips = t("errors.500.troubleshootingTips");
              if (Array.isArray(tips)) {
                return tips.map((tip, index) => (
                  <span key={index}>
                    • {tip}
                    {index < tips.length - 1 && <br />}
                  </span>
                ));
              }
              return (
                <span>
                  • Vérifiez votre connexion internet
                  <br />• Rafraîchissez la page
                </span>
              );
            })()}
          </Typography>
        </Box>

        {/* Contact support */}
        <Box className="mt-4 p-3 bg-blue-500/10 rounded-lg">
          <Typography variant="body2" className="text-foreground/80">
            {t("errors.500.needHelp")}{" "}
            <span className="text-blue-500 font-medium">
              support@optiacad.com
            </span>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}

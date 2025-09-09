"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import {
  Refresh as RefreshIcon,
  Home as HomeIcon,
  BugReport as BugReportIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  return (
    <html>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Paper
            elevation={3}
            className="p-8 bg-card max-w-lg w-full text-center"
          >
            {/* Icône d'erreur critique */}
            <Box className="mb-6">
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4">
                  <BugReportIcon className="text-white text-4xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-red-800 text-sm font-bold">!</span>
                </div>
              </div>
            </Box>

            {/* Message d'erreur */}
            <Typography
              variant="h4"
              component="h1"
              className="text-foreground mb-4 font-bold"
            >
              {t("errors.global.title")}
            </Typography>

            <Typography variant="body1" className="text-foreground/70 mb-6">
              {t("errors.global.message")}
            </Typography>

            {/* Détails techniques (optionnel) */}
            {process.env.NODE_ENV === "development" && (
              <Box className="bg-red-500/10 rounded-lg p-4 mb-6 text-left">
                <Typography
                  variant="body2"
                  className="text-red-600 font-mono text-sm"
                >
                  <strong>Erreur :</strong> {error.message}
                </Typography>
                {error.digest && (
                  <Typography
                    variant="body2"
                    className="text-red-600 font-mono text-sm mt-2"
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
                {t("errors.global.retry")}
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
                {t("errors.global.backToHome")}
              </Button>
            </Box>

            {/* Informations de support */}
            <Box className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg">
              <Typography variant="body2" className="text-foreground/80 mb-2">
                <strong>{t("errors.global.urgentHelp")}</strong>
              </Typography>
              <Typography variant="body2" className="text-foreground/70">
                {t("errors.global.contactTech")}{" "}
                <span className="text-blue-500 font-medium">
                  {t("errors.global.techEmail")}
                </span>
              </Typography>
            </Box>

            {/* Statut du service */}
            <Box className="mt-4 p-3 bg-green-500/10 rounded-lg">
              <Typography variant="body2" className="text-green-600">
                {t("errors.global.serverStatus")}
              </Typography>
            </Box>
          </Paper>
        </div>
      </body>
    </html>
  );
}

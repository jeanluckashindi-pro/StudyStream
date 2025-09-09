"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirection automatique vers la page de login
    const timer = setTimeout(() => {
      router.push("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Box className="text-center">
        <Typography
          variant="h4"
          component="h1"
          className="text-foreground mb-4"
        >
          OptiAcad
        </Typography>
        <Typography variant="body1" className="text-foreground/70 mb-6">
          Redirection vers la page de connexion...
        </Typography>
        <CircularProgress className="text-dark-blue" />
      </Box>
    </div>
  );
}

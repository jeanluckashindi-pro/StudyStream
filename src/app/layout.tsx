import type { Metadata } from "next";
import "./globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import I18nProvider from "../components/I18nProvider";
import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-josefin-sans",
});

export const metadata: Metadata = {
  title: "OptiAcad - Plateforme de gestion académique",
  description:
    "Plateforme complète de gestion académique avec modules d'authentification, gestion des étudiants, personnel, présence QR, évaluations et archives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased font-sans ${josefinSans.variable}`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

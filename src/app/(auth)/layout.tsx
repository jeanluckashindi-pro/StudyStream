import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentification - OptiAcad",
  description: "Page d'authentification pour OptiAcad",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

"use client";

import { useTranslation } from "react-i18next";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {/* Background sombre */}
      <div className="flex items-center justify-center p-4">
        {/* Carte centrale */}
        <div className="rounded-xl shadow-2xl w-full max-w-4xl p-8 relative border border-gray-700">
          {/* Header avec bouton retour */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4"
            >
              <ArrowBack className="mr-2" />
              {t("common.back")}
            </button>
            <h1 className="text-3xl font-bold text-blue-400 text-center">
              {t("privacy.title")}
            </h1>
            <p className="text-gray-300 text-sm text-center mt-3">
              {t("privacy.lastUpdated")}
            </p>
          </div>

          {/* Contenu */}
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("privacy.dataCollection.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("privacy.dataCollection.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("privacy.dataUsage.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("privacy.dataUsage.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("privacy.dataProtection.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("privacy.dataProtection.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("privacy.userRights.title")}
              </h2>
              <ul className="text-sm leading-relaxed space-y-2">
                <li>• {t("privacy.userRights.access")}</li>
                <li>• {t("privacy.userRights.rectification")}</li>
                <li>• {t("privacy.userRights.erasure")}</li>
                <li>• {t("privacy.userRights.portability")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("privacy.contact.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("privacy.contact.description")}
              </p>
              <p className="text-sm mt-2">
                Email:{" "}
                <span className="text-blue-400">privacy@optiacad.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

"use client";

import { useTranslation } from "react-i18next";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
              {t("terms.title")}
            </h1>
            <p className="text-gray-300 text-sm text-center mt-3">
              {t("terms.lastUpdated")}
            </p>
          </div>

          {/* Contenu */}
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("terms.acceptance.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("terms.acceptance.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("terms.serviceDescription.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("terms.serviceDescription.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("terms.userObligations.title")}
              </h2>
              <ul className="text-sm leading-relaxed space-y-2">
                <li>• {t("terms.userObligations.accurateInfo")}</li>
                <li>• {t("terms.userObligations.security")}</li>
                <li>• {t("terms.userObligations.compliance")}</li>
                <li>• {t("terms.userObligations.responsibleUse")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("terms.intellectualProperty.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("terms.intellectualProperty.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("terms.liability.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("terms.liability.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("terms.termination.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("terms.termination.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("terms.changes.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("terms.changes.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                {t("terms.contact.title")}
              </h2>
              <p className="text-sm leading-relaxed">
                {t("terms.contact.description")}
              </p>
              <p className="text-sm mt-2">
                Email: <span className="text-blue-400">legal@optiacad.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowBack, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function HelpPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: t("help.faq.login.question"),
      answer: t("help.faq.login.answer"),
    },
    {
      question: t("help.faq.password.question"),
      answer: t("help.faq.password.answer"),
    },
    {
      question: t("help.faq.account.question"),
      answer: t("help.faq.account.answer"),
    },
    {
      question: t("help.faq.security.question"),
      answer: t("help.faq.security.answer"),
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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
              {t("help.title")}
            </h1>
            <p className="text-gray-300 text-sm text-center mt-3">
              {t("help.description")}
            </p>
          </div>

          {/* Contenu */}
          <div className="space-y-6">
            {/* FAQ Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                {t("help.faq.title")}
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-600 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-4 py-3 text-left bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex justify-between items-center"
                    >
                      <span className="text-white font-medium">
                        {faq.question}
                      </span>
                      {expandedFaq === index ? (
                        <ExpandLess className="text-gray-400" />
                      ) : (
                        <ExpandMore className="text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 py-3 bg-gray-700">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                {t("help.contact.title")}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">
                    {t("help.contact.email.title")}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {t("help.contact.email.description")}
                  </p>
                  <a
                    href="mailto:support@optiacad.com"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    support@optiacad.com
                  </a>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">
                    {t("help.contact.response.title")}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t("help.contact.response.description")}
                  </p>
                </div>
              </div>
            </section>

            {/* Resources Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                {t("help.resources.title")}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push("/privacy")}
                  className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-left"
                >
                  <h3 className="text-white font-medium mb-2">
                    {t("help.resources.privacy.title")}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t("help.resources.privacy.description")}
                  </p>
                </button>
                <button
                  onClick={() => router.push("/terms")}
                  className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-left"
                >
                  <h3 className="text-white font-medium mb-2">
                    {t("help.resources.terms.title")}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t("help.resources.terms.description")}
                  </p>
                </button>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">
                    {t("help.resources.documentation.title")}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t("help.resources.documentation.description")}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

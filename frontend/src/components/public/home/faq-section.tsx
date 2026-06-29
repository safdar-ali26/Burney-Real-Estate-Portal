"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

const faqs = [
  {
    question: "How can I buy property in Dubai?",
    answer:
      "You can buy property in Dubai by selecting a suitable project, confirming availability, signing the booking form, paying the required booking amount, and completing the legal documentation with the developer or seller.",
  },
  {
    question: "Can I get a Golden Visa by investing in Dubai property?",
    answer:
      "Yes, property investors may qualify for UAE Golden Visa depending on the property value and eligibility criteria. Our advisors can guide you based on your investment amount.",
  },
  {
    question: "What is a payment plan in off-plan property?",
    answer:
      "A payment plan allows buyers to pay the property price in stages, such as during construction and sometimes after handover, depending on the developer offer.",
  },
  {
    question: "Can I buy property in Dubai with mortgage?",
    answer:
      "Yes, eligible residents and non-residents can apply for mortgage financing through banks in the UAE. Approval depends on income, documents, property type and bank policy.",
  },
  {
    question: "How is ROI calculated for Dubai property?",
    answer:
      "ROI is commonly calculated by dividing annual rental income by the property purchase price and multiplying by 100. Other costs such as service charges and maintenance should also be considered.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Section className="bg-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        <SectionHeading
          badge="FAQ"
          title="Dubai Real Estate Questions"
          description="Helpful answers for buyers, investors and first-time Dubai property clients."
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-white">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-[#EBCB4C] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen ? (
                  <div className="border-t border-white/10 px-5 py-4">
                    <p className="text-xs leading-6 text-white/55">
                      {faq.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Does it really look like a real tattoo?",
    a: "Yes — the fine-line printing and matte finish are designed to be indistinguishable from real ink at a glance.",
  },
  {
    q: "How do I remove it early?",
    a: "Rubbing alcohol works best, followed by baby oil or a makeup remover wipe if needed.",
  },
  {
    q: "Is it safe for sensitive skin?",
    a: "Our tattoos use skin-safe, dermatologically tested ink. We still recommend a small patch test first.",
  },
  {
    q: "Can I shower or swim with it on?",
    a: "Absolutely — every design is fully waterproof once applied and cured for the first hour.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Questions
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Frequently asked</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between text-left font-semibold text-slate-900"
                >
                  <span>{item.q}</span>
                  <span className={`gradient-text text-xl transition ${open ? "rotate-45" : ""}`}>+</span>
                </button>
                {open && <p className="mt-3 text-sm text-slate-600">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

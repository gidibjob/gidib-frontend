import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a equipe da GIDIB.",
};

const contactInfo = [
  { icon: Mail, label: "contato@gidib.org.br" },
  { icon: Phone, label: "(11) 0000-0000" },
  { icon: MapPin, label: "São Paulo - SP" },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        title="Contato"
        subtitle="Fale com a equipe da GIDIB. Estamos prontos para ouvir você."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Informações de contato
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {contactInfo.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gidib-green/10 text-gidib-green">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

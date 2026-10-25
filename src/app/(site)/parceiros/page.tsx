import type { Metadata } from "next";
import Link from "next/link";
import { Handshake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/reveal";
import { getPartners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Parceiros",
  description:
    "Organizações que caminham junto com a GIDIB pelo desenvolvimento da indústria brasileira.",
};

export const revalidate = 60;

export default async function ParceirosPage() {
  const partners = await getPartners();

  return (
    <>
      <PageHero
        title="Parceiros"
        subtitle="Organizações que caminham junto com a GIDIB pelo desenvolvimento da indústria brasileira."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={i * 60}>
              <div className="group flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gidib-green/40 hover:shadow-lg hover:shadow-gidib-navy/10">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gidib-navy/5 text-gidib-navy transition-colors duration-300 group-hover:bg-gidib-green/10 group-hover:text-gidib-green">
                  <Handshake className="size-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {partner.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-gidib-navy px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-xl font-bold sm:text-2xl">
            Quer se tornar um parceiro da GIDIB?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            Junte-se a nós para impulsionar a inovação, a qualificação e o
            desenvolvimento da indústria brasileira.
          </p>
          <Link
            href="/contato"
            className={buttonVariants({
              className: "mt-6 bg-gidib-green hover:bg-gidib-green-dark",
            })}
          >
            Fale com a gente
          </Link>
        </div>
      </section>
    </>
  );
}

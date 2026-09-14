import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/layout/page-hero";
import { projects } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Conheça os projetos e iniciativas da GIDIB para o desenvolvimento da indústria brasileira.",
};

export default function ProjetosPage() {
  return (
    <>
      <PageHero
        title="Projetos"
        subtitle="Iniciativas que conectam ideias, projetos e pessoas para uma indústria mais forte."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <Badge className="w-fit bg-gidib-navy text-white hover:bg-gidib-navy">
                  {project.category.toUpperCase()}
                </Badge>
                <h3 className="text-base font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import { Badge } from "@/components/ui/badge";
import { RemoteImage } from "@/components/remote-image";
import type { Project } from "@/types/content";

const projectCategoryClass: Record<string, string> = {
  Qualificação: "bg-gidib-green text-white",
  Inovação: "bg-gidib-blue text-white",
  Sustentabilidade: "bg-gidib-green-dark text-white",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gidib-green/40 hover:shadow-xl hover:shadow-gidib-navy/10">
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <RemoteImage
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Badge
          className={`w-fit hover:opacity-100 ${
            projectCategoryClass[project.category] ?? "bg-gidib-navy text-white"
          }`}
        >
          {project.category.toUpperCase()}
        </Badge>
        <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-gidib-green">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>
    </div>
  );
}

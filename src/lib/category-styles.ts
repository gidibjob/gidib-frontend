import type { PostCategory } from "@/types/content";

export const categoryStyles: Record<PostCategory, string> = {
  Tecnologia: "bg-gidib-blue text-white",
  Indústria: "bg-gidib-navy text-white",
  Carreira: "bg-gidib-yellow text-gidib-navy",
  Inovação: "bg-gidib-green text-white",
  Sustentabilidade: "bg-gidib-green-dark text-white",
  GIDIB: "bg-gidib-blue text-white",
};

export function categoryBadgeClass(category: PostCategory) {
  return categoryStyles[category] ?? "bg-gidib-navy text-white";
}

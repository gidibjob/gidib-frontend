import type { Event, Post } from "@/types/content";

export const categories = [
  "Tecnologia",
  "Indústria",
  "Carreira",
  "Inovação",
  "Sustentabilidade",
  "GIDIB",
] as const;

export const posts: Post[] = [
  {
    slug: "como-a-ia-esta-transformando-a-manutencao-industrial",
    title: "Como a IA está transformando a manutenção industrial",
    excerpt:
      "A inteligência artificial vem revolucionando a forma como as indústrias gerenciam seus ativos, aumentando a disponibilidade e reduzindo custos.",
    category: "Tecnologia",
    author: "Equipe GIDIB",
    date: "12 set 2026",
    readingTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    tags: ["IA", "Manutenção", "Indústria 4.0", "Dados"],
    content: [
      "A manutenção industrial está passando por uma transformação significativa com o uso da inteligência artificial. Com algoritmos avançados que analisam dados em tempo real, é possível prever falhas, otimizar recursos e aumentar a vida útil dos equipamentos.",
      "Neste artigo, exploramos como a IA está sendo aplicada à manutenção industrial, quais os principais benefícios e como uma empresa pode começar a implementar essa tecnologia.",
    ],
    relatedSlugs: [
      "power-bi-na-industria-dados-que-geram-resultados",
      "as-competencias-mais-valorizadas-na-industria-em-2027",
      "startups-que-estao-revolucionando-a-industria",
      "industria-verde-e-amarela-oportunidades-e-desafios",
      "evento-gidib-2026-inscricoes-abertas",
    ],
  },
  {
    slug: "power-bi-na-industria-dados-que-geram-resultados",
    title: "Power BI na indústria: dados que geram resultados",
    excerpt:
      "Como ferramentas de business intelligence estão ajudando indústrias a tomar decisões mais rápidas e assertivas.",
    category: "Indústria",
    author: "Equipe GIDIB",
    date: "10 set 2026",
    readingTime: "4 min de leitura",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Power BI", "Dados", "Indústria 4.0"],
    content: [
      "Dashboards e relatórios em tempo real vêm se tornando parte essencial da rotina de gestores industriais.",
    ],
  },
  {
    slug: "as-competencias-mais-valorizadas-na-industria-em-2027",
    title: "As competências mais valorizadas na indústria em 2027",
    excerpt:
      "Conheça as habilidades técnicas e comportamentais que estão em alta entre os profissionais da indústria.",
    category: "Carreira",
    author: "Equipe GIDIB",
    date: "08 set 2026",
    readingTime: "6 min de leitura",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80",
    tags: ["Carreira", "Qualificação"],
    content: ["O mercado industrial busca profissionais cada vez mais multidisciplinares."],
  },
  {
    slug: "startups-que-estao-revolucionando-a-industria",
    title: "Startups que estão revolucionando a indústria",
    excerpt:
      "Iniciativas inovadoras que estão trazendo novas soluções para os desafios da indústria brasileira.",
    category: "Inovação",
    author: "Equipe GIDIB",
    date: "05 set 2026",
    readingTime: "5 min de leitura",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    tags: ["Inovação", "Startups"],
    content: ["O ecossistema de inovação industrial no Brasil vem crescendo ano após ano."],
  },
  {
    slug: "industria-verde-e-amarela-oportunidades-e-desafios",
    title: "Indústria verde e amarela: oportunidades e desafios",
    excerpt:
      "Um panorama sobre a transição da indústria brasileira rumo a práticas mais sustentáveis.",
    category: "Sustentabilidade",
    author: "Equipe GIDIB",
    date: "02 set 2026",
    readingTime: "4 min de leitura",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    tags: ["Sustentabilidade", "ESG"],
    content: ["A sustentabilidade se tornou um pilar estratégico para a indústria."],
  },
  {
    slug: "evento-gidib-2026-inscricoes-abertas",
    title: "Evento GIDIB 2026: inscrições abertas",
    excerpt:
      "Já estão abertas as inscrições para o maior encontro de inovação da indústria brasileira.",
    category: "GIDIB",
    author: "Equipe GIDIB",
    date: "01 set 2026",
    readingTime: "3 min de leitura",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    tags: ["GIDIB", "Eventos"],
    content: ["O evento reunirá lideranças, especialistas e profissionais da indústria."],
  },
];

export const events: Event[] = [
  {
    slug: "ia-aplicada-a-industria",
    title: "IA aplicada à indústria",
    description:
      "Tendências, aplicações e casos reais de uso de inteligência artificial no setor industrial.",
    modality: "Webinar",
    date: "2026-10-18",
    day: "18",
    month: "OUT",
    time: "19:00",
    location: "Online",
    registrationUrl: "#",
  },
  {
    slug: "industria-4-0-na-pratica",
    title: "Indústria 4.0 na prática",
    description:
      "Ferramentas e estratégias para sua empresa iniciar a jornada da indústria 4.0.",
    modality: "Workshop",
    date: "2026-10-25",
    day: "25",
    month: "OUT",
    time: "09:00",
    location: "São Paulo - SP",
    registrationUrl: "#",
  },
  {
    slug: "desenvolvimento-da-industria-brasileira",
    title: "Desenvolvimento da Indústria Brasileira",
    description: "Networking, palestras e cases de sucesso.",
    modality: "Encontro",
    date: "2026-11-08",
    day: "08",
    month: "NOV",
    time: "08:00",
    location: "São Paulo - SP",
    registrationUrl: "#",
  },
  {
    slug: "manutencao-preditiva-com-iot",
    title: "Manutenção preditiva com IoT",
    description:
      "Como sensores e dados estão transformando a manutenção industrial.",
    modality: "Webinar",
    date: "2026-11-22",
    day: "22",
    month: "NOV",
    time: "19:00",
    location: "Online",
    registrationUrl: "#",
  },
];

export const projects = [
  {
    slug: "industria-4-0-para-todos",
    title: "Indústria 4.0 para todos",
    description:
      "Programa de capacitação em tecnologias de automação e digitalização para profissionais da indústria.",
    category: "Qualificação",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
  },
  {
    slug: "mapa-da-inovacao-industrial",
    title: "Mapa da Inovação Industrial",
    description:
      "Levantamento e mapeamento de iniciativas inovadoras na indústria brasileira.",
    category: "Inovação",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    slug: "industria-verde-e-amarela",
    title: "Indústria Verde e Amarela",
    description:
      "Iniciativa voltada para práticas sustentáveis e responsabilidade ambiental no setor industrial.",
    category: "Sustentabilidade",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
  },
];

export const partners = [
  { name: "AXTENN" },
  { name: "HEXAGON Manufacturing Intelligence" },
  { name: "Mac 3D" },
  { name: "SmartPLM" },
  { name: "Robótica — Revista Técnico-Científica" },
  { name: "Surface Técnica" },
  { name: "Simples Soluções" },
  { name: "Ragna Soluções em Tecnologia" },
  { name: "NR12 Sem Segredos" },
  { name: "Peerdustry" },
  { name: "MCK Automação Industrial" },
  { name: "Oriai" },
  { name: "IBVT" },
  { name: "Exithum" },
  { name: "Discuta Lean 4.0" },
  { name: "Dalca Brasil" },
  { name: "AI Robots" },
  { name: "3D Inovabr" },
  { name: "Manufatura Inteligente" },
  { name: "Ladder Edge" },
  { name: "IMAM" },
  { name: "Atalog" },
  { name: "Comac" },
];

export const stats = [
  { value: "+500", label: "Profissionais impactados" },
  { value: "+50", label: "Conteúdos publicados" },
  { value: "+20", label: "Eventos realizados" },
  { value: "+30", label: "Parceiros estratégicos" },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: Post) {
  if (!post.relatedSlugs?.length) {
    return posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 5);
  }
  return post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p));
}

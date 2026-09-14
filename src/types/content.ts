export type PostCategory =
  | "Tecnologia"
  | "Indústria"
  | "Carreira"
  | "Inovação"
  | "Sustentabilidade"
  | "GIDIB";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  author: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  content: string[];
  relatedSlugs?: string[];
};

export type EventModality = "Presencial" | "Online" | "Workshop" | "Webinar" | "Encontro";

export type Event = {
  slug: string;
  title: string;
  description: string;
  modality: EventModality;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  registrationUrl: string;
};

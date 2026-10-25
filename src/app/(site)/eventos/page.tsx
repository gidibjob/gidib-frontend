import type { Metadata } from "next";
import { getEvents } from "@/lib/content";
import { EventosPageClient } from "./eventos-page-client";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Participe, aprenda e conecte-se com profissionais da indústria.",
};

export const revalidate = 60;

export default async function EventosPage() {
  const events = await getEvents();

  return (
    <div className="bg-gidib-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-h2">Próximos eventos</h1>
        <p className="mt-2 text-white/80">
          Participe, aprenda e conecte-se com profissionais da indústria.
        </p>
      </div>

      <div className="rounded-t-3xl bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <EventosPageClient events={events} />
        </div>
      </div>
    </div>
  );
}

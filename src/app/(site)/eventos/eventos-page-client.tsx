"use client";

import { useMemo, useState } from "react";
import { CalendarX2 } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Reveal } from "@/components/reveal";
import { events } from "@/lib/mock-data";
import type { EventModality } from "@/types/content";

const FILTERS = [
  "Todos",
  "Presencial",
  "Online",
  "Workshop",
  "Webinar",
  "Encontro",
] as const;

export function EventosPageClient() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>(
    "Todos"
  );

  const filteredEvents = useMemo(() => {
    if (activeFilter === "Todos") return events;
    return events.filter(
      (event) => event.modality === (activeFilter as EventModality)
    );
  }, [activeFilter]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              activeFilter === filter
                ? "border-gidib-green bg-gidib-green text-white shadow-md shadow-gidib-green/20"
                : "border-border bg-background text-muted-foreground hover:border-gidib-green hover:text-gidib-green"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredEvents.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {filteredEvents.map((event, i) => (
            <Reveal key={event.slug} delay={i * 60}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <CalendarX2 className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            Nenhum evento encontrado para esse filtro.
          </p>
        </div>
      )}
    </>
  );
}

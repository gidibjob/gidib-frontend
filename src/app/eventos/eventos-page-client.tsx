"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/events/event-card";
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
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === filter
                ? "border-gidib-green bg-gidib-green text-white"
                : "border-border bg-background text-muted-foreground hover:border-gidib-green hover:text-gidib-green"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredEvents.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Nenhum evento encontrado para esse filtro.
        </p>
      )}
    </>
  );
}

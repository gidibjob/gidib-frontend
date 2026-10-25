"use client";

import { notFound, useParams } from "next/navigation";
import { useAdminEvents } from "@/lib/admin-store";
import { EventForm } from "../event-form";

export default function EditEventPage() {
  const params = useParams<{ slug: string }>();
  const { items, hydrated, update } = useAdminEvents();
  const event = items.find((e) => e.slug === params.slug);

  if (hydrated && !event) notFound();
  if (!event) return null;

  return (
    <div>
      <EventForm
        initial={event}
        submitLabel="Salvar alterações"
        onSubmit={(updated) => update(params.slug, updated)}
      />
    </div>
  );
}

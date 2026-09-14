"use client";

import { useAdminEvents } from "@/lib/admin-store";
import { EventForm } from "../event-form";

export default function NewEventPage() {
  const { create } = useAdminEvents();

  return (
    <div className="mx-auto max-w-3xl">
      <EventForm submitLabel="Criar evento" onSubmit={create} />
    </div>
  );
}

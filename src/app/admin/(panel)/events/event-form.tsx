"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/admin-store";
import type { AdminEvent } from "@/types/admin";
import { eventStatusLabels } from "@/types/admin";
import type { EventModality } from "@/types/content";

const MODALITIES: EventModality[] = [
  "Presencial",
  "Online",
  "Workshop",
  "Webinar",
  "Encontro",
];

const STATUS_OPTIONS = Object.entries(eventStatusLabels) as Array<
  [AdminEvent["status"], string]
>;

const MONTHS = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
];

type Props = {
  initial?: AdminEvent;
  onSubmit: (event: AdminEvent) => void;
  submitLabel: string;
};

function toDateInputValue(day?: string, month?: string) {
  if (!day || !month) return "";
  const monthIndex = MONTHS.indexOf(month);
  if (monthIndex === -1) return "";
  const year = new Date().getFullYear();
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function EventForm({ initial, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [description, setDescription] = useState(initial?.description ?? "");
  const [modality, setModality] = useState<EventModality>(
    initial?.modality ?? "Presencial"
  );
  const [date, setDate] = useState(
    toDateInputValue(initial?.day, initial?.month) ?? ""
  );
  const [time, setTime] = useState(initial?.time ?? "19:00");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [registrationUrl, setRegistrationUrl] = useState(
    initial?.registrationUrl ?? ""
  );
  const [status, setStatus] = useState<AdminEvent["status"]>(
    initial?.status ?? "draft"
  );

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        const finalSlug = slug.trim() || slugify(title);
        const parsedDate = date ? new Date(`${date}T00:00:00`) : new Date();

        onSubmit({
          slug: finalSlug,
          title,
          description,
          modality,
          date: parsedDate.toISOString().slice(0, 10),
          day: String(parsedDate.getDate()).padStart(2, "0"),
          month: MONTHS[parsedDate.getMonth()],
          time,
          location,
          registrationUrl: registrationUrl || "#",
          status,
        });
        router.push("/admin/events");
      }}
    >
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Evento</h2>
        <div className="mt-4 grid gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Título
            </label>
            <Input
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              placeholder="Título do evento"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Slug
            </label>
            <Input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Descrição
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-gidib-green focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          Data, local e modalidade
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Modalidade
            </label>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value as EventModality)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-gidib-green"
            >
              {MODALITIES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Local / link
            </label>
            <Input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Online, ou São Paulo - SP"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Data
            </label>
            <Input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Horário
            </label>
            <Input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">
              Link de inscrição
            </label>
            <Input
              value={registrationUrl}
              onChange={(e) => setRegistrationUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Status</h2>
        <div className="mt-4 max-w-xs">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as AdminEvent["status"])}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-gidib-green"
          >
            {STATUS_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/events")}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="btn-hero-primary bg-gidib-green hover:bg-gidib-green-dark"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

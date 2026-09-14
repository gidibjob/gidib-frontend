import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/content";

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center">
      <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-gidib-navy px-4 py-2 text-white">
        <span className="text-2xl font-bold leading-none">{event.day}</span>
        <span className="text-xs font-medium uppercase tracking-wide">
          {event.month}
        </span>
      </div>

      <div className="flex-1">
        <Badge
          variant="outline"
          className="mb-2 border-gidib-green text-gidib-green"
        >
          {event.modality.toUpperCase()}
        </Badge>
        <h3 className="text-base font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" /> {event.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {event.time}
          </span>
        </div>
      </div>

      <Button className="w-full shrink-0 bg-gidib-green hover:bg-gidib-green-dark sm:w-auto">
        Inscreva-se
      </Button>
    </div>
  );
}

import { CalendarClock } from "lucide-react";

export function NoUpcomingEvents() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-gidib-green/10 text-gidib-green">
        <CalendarClock className="size-5" />
      </div>
      <p className="text-base font-semibold text-foreground">
        Aguarde os próximos eventos
      </p>
      <p className="max-w-sm text-sm text-muted-foreground">
        No momento não há eventos agendados. Em breve divulgaremos novas datas
        por aqui.
      </p>
    </div>
  );
}

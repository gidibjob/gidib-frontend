import { ExternalLink, Handshake } from "lucide-react";
import { safeExternalUrl } from "@/lib/url";
import type { Partner } from "@/types/content";

const base =
  "group flex items-center gap-3 rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gidib-navy/10";

export function PartnerCard({ partner }: { partner: Partner }) {
  const href = safeExternalUrl(partner.websiteUrl);

  const content = (
    <>
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gidib-navy/5 text-gidib-navy transition-colors duration-300 group-hover:bg-gidib-green/10 group-hover:text-gidib-green">
        <Handshake className="size-5" />
      </div>
      <p className="text-sm font-semibold text-foreground">{partner.name}</p>
      {href && (
        <span className="ml-auto flex shrink-0 items-center gap-1 text-xs font-medium text-gidib-green">
          Visitar site
          <ExternalLink className="size-3.5" />
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <div className={`${base} border-border hover:border-gidib-green/40`}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${partner.name} (abre o site em uma nova aba)`}
      className={`${base} border-gidib-green/40 hover:border-gidib-green`}
    >
      {content}
    </a>
  );
}

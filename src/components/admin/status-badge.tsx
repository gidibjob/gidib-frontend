import { Badge } from "@/components/ui/badge";
import type { EventStatus, PostStatus } from "@/types/admin";
import { eventStatusLabels, postStatusLabels } from "@/types/admin";

const postStatusClass: Record<PostStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-gidib-yellow/20 text-gidib-navy",
  published: "bg-gidib-green/15 text-gidib-green",
  archived: "bg-muted text-muted-foreground line-through",
};

const eventStatusClass: Record<EventStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-gidib-green/15 text-gidib-green",
  closed: "bg-gidib-blue/15 text-gidib-blue",
  cancelled: "bg-destructive/10 text-destructive",
};

export function PostStatusBadge({ status }: { status: PostStatus }) {
  return (
    <Badge className={`hover:opacity-100 ${postStatusClass[status]}`}>
      {postStatusLabels[status]}
    </Badge>
  );
}

export function EventStatusBadge({ status }: { status: EventStatus }) {
  return (
    <Badge className={`hover:opacity-100 ${eventStatusClass[status]}`}>
      {eventStatusLabels[status]}
    </Badge>
  );
}

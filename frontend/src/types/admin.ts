export interface AdminAnnouncement {
  id: string;
  title: string;
  category: "event" | "scholarship" | "internship" | "competition" | "notice";
  content: string;
  status: "draft" | "published";
  createdAt: string;
}

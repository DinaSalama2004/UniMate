export type AnnouncementStatus = "draft" | "published";

export interface Announcement {
  id: number;
  title: string;
  content: string;
  category: string;
  status: AnnouncementStatus;
  created_at: string;
}

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  category: string;
  status: AnnouncementStatus;
}

export interface UpdateAnnouncementPayload {
  title?: string;
  content?: string;
  category?: string;
  status?: AnnouncementStatus;
}
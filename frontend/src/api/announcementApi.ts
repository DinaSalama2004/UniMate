import { fetchAPI } from "@/lib/api";
import {
  Announcement,
  CreateAnnouncementPayload,
  UpdateAnnouncementPayload,
} from "@/types/announcement";


// GET ALL
export async function getAllAnnouncements(): Promise<Announcement[]> {
  return await fetchAPI("/announcements/");
}

// GET ONE
export async function getAnnouncementById(
  id: string
): Promise<Announcement> {
  return await fetchAPI(`/announcements/${id}`);
}

// CREATE
export async function createAnnouncement(
  data: CreateAnnouncementPayload
): Promise<Announcement> {
  return await fetchAPI(`/announcements/create`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// UPDATE
export async function updateAnnouncement(
  id: string,
  data: UpdateAnnouncementPayload
): Promise<Announcement> {
  return await fetchAPI(`/announcements/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE
export async function deleteAnnouncement(id: string) {
  return await fetchAPI(`/announcements/${id}`, {
    method: "DELETE",
  });
}


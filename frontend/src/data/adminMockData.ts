import { AdminAnnouncement } from "@/types/admin";

export const mockAdminAnnouncements: AdminAnnouncement[] = [
  {
    id: "a1",
    title: "Google Summer of Code 2024 Applications Open",
    category: "internship",
    content: "Annual global program focused on bringing student developers into open source. Stipend up to $6,000 for 12-week program.",
    status: "published",
    createdAt: "2024-02-15",
  },
  {
    id: "a2",
    title: "Dean's List Scholarship Applications",
    category: "scholarship",
    content: "Merit-based scholarships for students with GPA above 3.5. Applications due by March 1st.",
    status: "published",
    createdAt: "2024-02-10",
  },
  {
    id: "a3",
    title: "Hackathon: Build for the Future",
    category: "competition",
    content: "48-hour hackathon focusing on sustainable technology solutions. Prizes up to $10,000.",
    status: "published",
    createdAt: "2024-03-01",
  },
  {
    id: "a4",
    title: "Tech Career Fair - Spring 2024",
    category: "event",
    content: "Over 50 companies recruiting for internships and full-time positions. Register by Feb 20th.",
    status: "draft",
    createdAt: "2024-02-25",
  },
  {
    id: "a5",
    title: "Course Registration Deadline Extended",
    category: "notice",
    content: "Add/drop period extended to February 28th due to system maintenance.",
    status: "draft",
    createdAt: "2024-02-12",
  },
];

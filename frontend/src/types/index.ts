export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  grade?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prerequisites: string[];
  prerequisitesMet?: boolean;
  reason?: string;
  semester?: number;
}

export interface Major {
  id: string;
  name: string;
  matchPercentage: number;
  strengths: string[];
  challenges: string[];
  careers: string[];
  description: string;
}

export interface Career {
  id: string;
  title: string;
  matchScore: number;
  requiredSkills: string[];
  suggestedIndustries: string[];
  internships: string[];
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  currentLevel: number;
  targetLevel: number;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: "course" | "tutorial" | "workshop" | "article";
  url?: string;
  saved?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  category: "event" | "scholarship" | "internship" | "competition" | "notice";
  description: string;
  date: string;
  saved?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ProfileData {
  university: string;
  college: string;
  academicYear: string;
  interests: string[];
  courses: Course[];
  gpa?: number;
  careerPreferences?: string[];
}

export interface SemesterPlan {
  semester: number;
  year: string;
  courses: Course[];
  totalCredits: number;
  workload: "Low" | "Medium" | "High";
}
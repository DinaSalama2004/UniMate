import { Course, Major, Career, Skill, Announcement, SemesterPlan } from "@/types";

export const mockInterests = [
  "Artificial Intelligence",
  "Web Development",
  "Data Science",
  "Mobile Applications"
];


export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Machine Learning Fundamentals",
    code: "CS401",
    credits: 3,
    difficulty: "Medium",
    prerequisites: ["CS201", "MATH301"],
    prerequisitesMet: true,
    reason: "Aligns with your AI interest and strong programming background",
  },
  {
    id: "2",
    name: "Data Structures & Algorithms",
    code: "CS201",
    credits: 4,
    difficulty: "Medium",
    prerequisites: ["CS101"],
    prerequisitesMet: true,
    reason: "Core requirement for your major, builds on your programming foundation",
  },
  {
    id: "3",
    name: "Web Development",
    code: "CS310",
    credits: 3,
    difficulty: "Easy",
    prerequisites: ["CS101"],
    prerequisitesMet: true,
    reason: "Practical skills aligned with your web development interest",
  },
  {
    id: "4",
    name: "Database Systems",
    code: "CS320",
    credits: 3,
    difficulty: "Medium",
    prerequisites: ["CS201"],
    prerequisitesMet: true,
    reason: "Essential for backend development and data-focused careers",
  },
  {
    id: "5",
    name: "Artificial Intelligence",
    code: "CS450",
    credits: 4,
    difficulty: "Hard",
    prerequisites: ["CS401", "MATH301"],
    prerequisitesMet: false,
    reason: "Advanced AI course - complete ML Fundamentals first",
  },
];

export const mockMajors: Major[] = [
  {
    id: "1",
    name: "Computer Science",
    matchPercentage: 92,
    description: "Study of computation, algorithms, and information processing systems.",
    strengths: [
      "Strong programming foundation",
      "High problem-solving aptitude",
      "Interest in AI aligns well",
    ],
    challenges: [
      "Math-intensive upper courses",
      "Competitive job market requires specialization",
    ],
    careers: ["Software Engineer", "Data Scientist", "ML Engineer", "Full-Stack Developer"],
  },
  {
    id: "2",
    name: "Data Science",
    matchPercentage: 87,
    description: "Interdisciplinary field focused on extracting insights from data.",
    strengths: [
      "AI interest matches perfectly",
      "Growing industry demand",
      "Strong analytical skills",
    ],
    challenges: [
      "Requires strong statistics background",
      "Fast-evolving tools and technologies",
    ],
    careers: ["Data Scientist", "Data Analyst", "ML Engineer", "Business Intelligence"],
  },
  {
    id: "3",
    name: "Software Engineering",
    matchPercentage: 85,
    description: "Application of engineering principles to software development.",
    strengths: [
      "Practical project experience",
      "Team collaboration focus",
      "Web development interest fits well",
    ],
    challenges: [
      "Less theoretical depth",
      "Requires continuous learning",
    ],
    careers: ["Software Engineer", "DevOps Engineer", "Tech Lead", "Product Manager"],
  },
];

export const mockCareers: Career[] = [
  {
    id: "1",
    title: "Software Engineer",
    matchScore: 94,
    description: "Design, develop, and maintain software applications and systems.",
    requiredSkills: ["Programming", "Data Structures", "System Design", "Version Control"],
    suggestedIndustries: ["Tech", "Finance", "Healthcare", "E-commerce"],
    internships: ["Google STEP", "Microsoft Explore", "Meta University"],
  },
  {
    id: "2",
    title: "Data Scientist",
    matchScore: 88,
    description: "Analyze complex data to help organizations make better decisions.",
    requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    suggestedIndustries: ["Tech", "Finance", "Research", "Consulting"],
    internships: ["Facebook Data Science", "Amazon Applied Science", "Two Sigma"],
  },
  {
    id: "3",
    title: "Machine Learning Engineer",
    matchScore: 85,
    description: "Build and deploy machine learning models at scale.",
    requiredSkills: ["Deep Learning", "Python", "TensorFlow/PyTorch", "Cloud Platforms"],
    suggestedIndustries: ["Tech", "Automotive", "Healthcare", "Robotics"],
    internships: ["OpenAI Research", "DeepMind", "NVIDIA AI"],
  },
  {
    id: "4",
    title: "Full-Stack Developer",
    matchScore: 82,
    description: "Build complete web applications from frontend to backend.",
    requiredSkills: ["React/Vue", "Node.js", "Databases", "REST APIs", "DevOps"],
    suggestedIndustries: ["Startups", "E-commerce", "SaaS", "Agencies"],
    internships: ["Y Combinator Startups", "Stripe", "Shopify"],
  },
];

export const mockSkills: Skill[] = [
  {
    id: "1",
    name: "Python Programming",
    currentLevel: 75,
    targetLevel: 90,
    resources: [
      { id: "r1", title: "Advanced Python Patterns", type: "course", saved: false },
      { id: "r2", title: "Python Data Science Handbook", type: "tutorial", saved: true },
    ],
  },
  {
    id: "2",
    name: "Machine Learning",
    currentLevel: 40,
    targetLevel: 80,
    resources: [
      { id: "r3", title: "Andrew Ng's ML Course", type: "course", saved: true },
      { id: "r4", title: "Hands-On ML with Scikit-Learn", type: "tutorial", saved: false },
    ],
  },
  {
    id: "3",
    name: "Data Structures",
    currentLevel: 65,
    targetLevel: 85,
    resources: [
      { id: "r5", title: "LeetCode Problem Sets", type: "workshop", saved: false },
      { id: "r6", title: "System Design Primer", type: "article", saved: false },
    ],
  },
  {
    id: "4",
    name: "SQL & Databases",
    currentLevel: 50,
    targetLevel: 75,
    resources: [
      { id: "r7", title: "SQL Masterclass", type: "course", saved: false },
      { id: "r8", title: "Database Design Workshop", type: "workshop", saved: false },
    ],
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Google Summer of Code 2024 Applications Open",
    category: "internship",
    description: "Annual global program focused on bringing student developers into open source. Stipend up to $6,000 for 12-week program.",
    date: "2024-02-15",
    saved: true,
  },
  {
    id: "2",
    title: "Dean's List Scholarship Applications",
    category: "scholarship",
    description: "Merit-based scholarships for students with GPA above 3.5. Applications due by March 1st.",
    date: "2024-02-10",
    saved: false,
  },
  {
    id: "3",
    title: "Hackathon: Build for the Future",
    category: "competition",
    description: "48-hour hackathon focusing on sustainable technology solutions. Prizes up to $10,000.",
    date: "2024-03-01",
    saved: false,
  },
  {
    id: "4",
    title: "Tech Career Fair - Spring 2024",
    category: "event",
    description: "Over 50 companies recruiting for internships and full-time positions. Register by Feb 20th.",
    date: "2024-02-25",
    saved: true,
  },
  {
    id: "5",
    title: "Course Registration Deadline Extended",
    category: "notice",
    description: "Add/drop period extended to February 28th due to system maintenance.",
    date: "2024-02-12",
    saved: false,
  },
];

export const mockStudyPlan: SemesterPlan[] = [
  {
    semester: 1,
    year: "Fall 2024",
    courses: [
      { id: "p1", name: "Data Structures & Algorithms", code: "CS201", credits: 4, difficulty: "Medium", prerequisites: [] },
      { id: "p2", name: "Web Development", code: "CS310", credits: 3, difficulty: "Easy", prerequisites: [] },
      { id: "p3", name: "Linear Algebra", code: "MATH301", credits: 3, difficulty: "Medium", prerequisites: [] },
    ],
    totalCredits: 10,
    workload: "Medium",
  },
  {
    semester: 2,
    year: "Spring 2025",
    courses: [
      { id: "p4", name: "Machine Learning Fundamentals", code: "CS401", credits: 3, difficulty: "Medium", prerequisites: [] },
      { id: "p5", name: "Database Systems", code: "CS320", credits: 3, difficulty: "Medium", prerequisites: [] },
      { id: "p6", name: "Probability & Statistics", code: "MATH302", credits: 3, difficulty: "Medium", prerequisites: [] },
    ],
    totalCredits: 9,
    workload: "Medium",
  },
  {
    semester: 3,
    year: "Fall 2025",
    courses: [
      { id: "p7", name: "Artificial Intelligence", code: "CS450", credits: 4, difficulty: "Hard", prerequisites: [] },
      { id: "p8", name: "Cloud Computing", code: "CS440", credits: 3, difficulty: "Medium", prerequisites: [] },
      { id: "p9", name: "Technical Writing", code: "ENG201", credits: 2, difficulty: "Easy", prerequisites: [] },
    ],
    totalCredits: 9,
    workload: "High",
  },
  {
    semester: 4,
    year: "Spring 2026",
    courses: [
      { id: "p10", name: "Deep Learning", code: "CS460", credits: 4, difficulty: "Hard", prerequisites: [] },
      { id: "p11", name: "Capstone Project", code: "CS499", credits: 4, difficulty: "Medium", prerequisites: [] },
    ],
    totalCredits: 8,
    workload: "High",
  },
];

export const mockProfileInterests = [
  "Artificial Intelligence",
  "Web Development",
  "Data Science",
  "Mobile Applications"
];

export const mockProfileSkills = [
  "Python",
  "SQL",
  "React",
  "Machine Learning Basics",
  "Problem Solving"
];


export const mockProfileCourses = [
  { id: 1, code: "HU111", name: "Technical Report Writing", credits: 2, grade: "C+", year: 2022, level: "First Level", term: "First Term", status: "Completed" },
  { id: 2, code: "HU113", name: "Creative Thinking and Communication Skills", credits: 2, grade: "B+", year: 2022, level: "First Level", term: "First Term", status: "Completed" },
  { id: 3, code: "MA000", name: "Math-0", credits: 0, grade: "B", year: 2022, level: "First Level", term: "First Term", status: "Completed" },
  { id: 4, code: "MA112", name: "Discrete Mathematics", credits: 3, grade: "B", year: 2022, level: "First Level", term: "First Term", status: "Completed" },
  { id: 5, code: "IT111", name: "Electronics", credits: 3, grade: "A+", year: 2022, level: "First Level", term: "First Term", status: "Completed" },
  { id: 6, code: "CS111", name: "Fundamentals of Computer Science", credits: 3, grade: "B", year: 2022, level: "First Level", term: "First Term", status: "Completed" },

  { id: 7, code: "HU124", name: "Critical Thinking", credits: 0, grade: "A", year: 2022, level: "First Level", term: "Second Term", status: "Completed" },
  { id: 8, code: "HU121", name: "Fundamentals of Economics", credits: 2, grade: "A", year: 2022, level: "First Level", term: "Second Term", status: "Completed" },
  { id: 9, code: "CS112", name: "Structured Programming", credits: 3, grade: "A+", year: 2022, level: "First Level", term: "Second Term", status: "Completed" },
  { id: 10, code: "MA111", name: "Math-1", credits: 3, grade: "C+", year: 2022, level: "First Level", term: "Second Term", status: "Completed" },
  { id: 11, code: "HU112", name: "Ethics and Professionalism", credits: 2, grade: "A+", year: 2022, level: "First Level", term: "Second Term", status: "Completed" },

  { id: 12, code: "ST121", name: "Probability and Statistics-1", credits: 3, grade: "A+", year: 2022, level: "First Level", term: "Summer Term", status: "Completed" },
  { id: 13, code: "MA113", name: "Math-2", credits: 3, grade: "B+", year: 2022, level: "First Level", term: "Summer Term", status: "Completed" },

  { id: 14, code: "HU225", name: "Entrepreneurship", credits: 0, grade: "C", year: 2023, level: "Second Level", term: "First Term", status: "Completed" },
  { id: 15, code: "MA214", name: "Math-3", credits: 3, grade: "A", year: 2023, level: "Second Level", term: "First Term", status: "Completed" },
  { id: 16, code: "ST222", name: "Probability and Statistics-2", credits: 3, grade: "B", year: 2023, level: "Second Level", term: "First Term", status: "Completed" },
  { id: 17, code: "CS213", name: "Object Oriented Programming", credits: 3, grade: "B+", year: 2023, level: "Second Level", term: "First Term", status: "Completed" },
  { id: 18, code: "DS211", name: "Operations Research & Decision Support", credits: 3, grade: "A", year: 2023, level: "Second Level", term: "First Term", status: "Completed" },
  { id: 19, code: "IT212", name: "Logic Design", credits: 3, grade: "B+", year: 2023, level: "Second Level", term: "First Term", status: "Completed" },
  { id: 20, code: "IT221", name: "Computer Networks Technology", credits: 3, grade: "B+", year: 2023, level: "Second Level", term: "First Term", status: "Completed" },

  { id: 21, code: "HU117", name: "Social Issues", credits: 0, grade: "D+", year: 2023, level: "Second Level", term: "Second Term", status: "Completed" },
  { id: 22, code: "HU118", name: "Selected Topics in Humanities", credits: 2, grade: "C", year: 2023, level: "Second Level", term: "Second Term", status: "Completed" },
  { id: 23, code: "CS214", name: "Data Structures", credits: 3, grade: "B+", year: 2023, level: "Second Level", term: "Second Term", status: "Completed" },
  { id: 24, code: "CS251", name: "Introduction to Software Engineering", credits: 3, grade: "B", year: 2023, level: "Second Level", term: "Second Term", status: "Completed" },
  { id: 25, code: "IS211", name: "Introduction to Database Systems", credits: 3, grade: "C+", year: 2023, level: "Second Level", term: "Second Term", status: "Completed" },
  { id: 26, code: "IS231", name: "Web Technology", credits: 3, grade: "B", year: 2023, level: "Second Level", term: "Second Term", status: "Completed" },
  { id: 27, code: "DS251", name: "Fundamentals of Management", credits: 2, grade: "B", year: 2023, level: "Second Level", term: "Second Term", status: "Completed" },

  { id: 28, code: "CS321", name: "Algorithms Analysis and Design", credits: 3, grade: "B+", year: 2024, level: "Third Level", term: "First Term", status: "Completed" },
  { id: 29, code: "CS341", name: "Operating Systems", credits: 3, grade: "A+", year: 2024, level: "Third Level", term: "First Term", status: "Completed" },
  { id: 30, code: "CS352", name: "Advanced Software Engineering", credits: 3, grade: "B", year: 2024, level: "Third Level", term: "First Term", status: "Completed" },
  { id: 31, code: "IS312", name: "Database Management Systems", credits: 3, grade: "C+", year: 2024, level: "Third Level", term: "First Term", status: "Completed" },
  { id: 32, code: "IS321", name: "File Management and Processing", credits: 3, grade: "B+", year: 2024, level: "Third Level", term: "First Term", status: "Completed" },
  { id: 33, code: "IS332", name: "Analysis & Design of Information Systems", credits: 3, grade: "A", year: 2024, level: "Third Level", term: "First Term", status: "Completed" },

  { id: 34, code: "CS361", name: "Artificial Intelligence", credits: 3, grade: "B+", year: 2024, level: "Third Level", term: "Second Term", status: "Completed" },
  { id: 35, code: "IS313", name: "Data Warehousing", credits: 3, grade: "B", year: 2024, level: "Third Level", term: "Second Term", status: "Completed" },
  { id: 36, code: "IS333", name: "Web-based Information Systems Development", credits: 3, grade: "B+", year: 2024, level: "Third Level", term: "Second Term", status: "Completed" },
  { id: 37, code: "IS341", name: "Business Process Management", credits: 3, grade: "B+", year: 2024, level: "Third Level", term: "Second Term", status: "Completed" },
  { id: 38, code: "IS322", name: "Information Retrieval", credits: 3, grade: "B", year: 2024, level: "Third Level", term: "Second Term", status: "Completed" }
];


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  GraduationCap,
  BookOpen,
  User,
  ClipboardList,
  Edit3,
  Shield,
  Mail,
  Lock,
  UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/context/ProfileContext";
import { Course } from "@/types";

const universities = [
  "Cairo University",
  "Ain Shams University",
  "Alexandria University",
  "Helwan University",
  "Mansoura University",
  "Assiut University",
  "Zagazig University",
  "Tanta University",
  "Benha University",
  "Suez Canal University",
  "Other",
];

const colleges = [
  "Faculty of Engineering",
  "Faculty of Computers and Artificial Intelligence",
  "Faculty of Science",
  "Faculty of Medicine",
  "Faculty of Pharmacy",
  "Faculty of Dentistry",
  "Faculty of Law",
  "Faculty of Economics and Political Science",
  "Faculty of Commerce",
  "Other",
];

const years = ["First", "Second", "Third", "Fourth"];


const interests = [
  { id: "ai", label: "Artificial Intelligence" },
  { id: "web", label: "Web Development" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "data", label: "Data Science" },
  { id: "security", label: "Cybersecurity" },
  { id: "cloud", label: "Cloud Computing" },
  { id: "design", label: "UI/UX Design" },
  { id: "business", label: "Business & Startups" },
  { id: "research", label: "Academic Research" },
  { id: "game", label: "Game Development" },
];

const exampleGrades = `Go to your official college results website,
press Ctrl + A to select all grades,
then Ctrl + C to copy,
and paste everything here (Ctrl + V).

UniMate will automatically extract your courses and grades.`
  ;

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { profile, updateProfile, setCurrentStep, currentStep, setHasCompletedSetup } = useProfile();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [gradesText, setGradesText] = useState("");
  const [extractedCourses, setExtractedCourses] = useState<Course[]>([]);

  const [localProfile, setLocalProfile] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    college: "",
    academicYear: "",
    major: "",
    interests: [] as string[],
  });

  const majors = [
    "Information Systems",
    "Computer Science",
    "Decision Support",
    "Information Technology",
  ];


  const [passwordError, setPasswordError] = useState("");

  const totalSteps = 5;

  const processingMessages = [
    "Extracting courses...",
    "Calculating GPA...",
    "Checking prerequisites...",
    "Analyzing your academic profile...",
  ];

  const handleInterestToggle = (interestId: string) => {
    setLocalProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((i) => i !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setLocalProfile((prev) => ({ ...prev, [field]: value }));

    // Clear password error when user starts typing
    if (field === "password" || field === "confirmPassword") {
      setPasswordError("");
    }
  };

  const simulateGradeExtraction = () => {
    setIsProcessing(true);
    setProcessingStep(0);

    const interval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= processingMessages.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          // Simulate extracted courses
          setExtractedCourses([
            { id: "1", name: "Technical Report Writing", code: "HU111", credits: 2, grade: "C+", difficulty: "Easy", prerequisites: [] },
            { id: "2", name: "Creative Thinking and Communication Skills", code: "HU113", credits: 2, grade: "B+", difficulty: "Easy", prerequisites: [] },
            { id: "3", name: "Math-0", code: "MA000", credits: 0, grade: "B", difficulty: "Easy", prerequisites: [] },
            { id: "4", name: "Discrete Mathematics", code: "MA112", credits: 3, grade: "B", difficulty: "Medium", prerequisites: ["MA000"] },
            { id: "5", name: "Electronics", code: "IT111", credits: 3, grade: "A+", difficulty: "Medium", prerequisites: [] },
            { id: "6", name: "Fundamentals of Computer Science", code: "CS111", credits: 3, grade: "B", difficulty: "Medium", prerequisites: [] },

            { id: "7", name: "Critical Thinking", code: "HU124", credits: 0, grade: "A", difficulty: "Easy", prerequisites: [] },
            { id: "8", name: "Fundamentals of Economics", code: "HU121", credits: 2, grade: "A", difficulty: "Easy", prerequisites: [] },
            { id: "9", name: "Structured Programming", code: "CS112", credits: 3, grade: "A+", difficulty: "Medium", prerequisites: ["CS111"] },
            { id: "10", name: "Math-1", code: "MA111", credits: 3, grade: "C+", difficulty: "Medium", prerequisites: ["MA000"] },
            { id: "11", name: "Ethics and Professionalism", code: "HU112", credits: 2, grade: "A+", difficulty: "Easy", prerequisites: [] },

            { id: "12", name: "Probability and Statistics-1", code: "ST121", credits: 3, grade: "A+", difficulty: "Medium", prerequisites: ["MA111"] },
            { id: "13", name: "Math-2", code: "MA113", credits: 3, grade: "B+", difficulty: "Medium", prerequisites: ["MA111"] },

            { id: "14", name: "Entrepreneurship", code: "HU225", credits: 0, grade: "C", difficulty: "Easy", prerequisites: [] },
            { id: "15", name: "Math-3", code: "MA214", credits: 3, grade: "A", difficulty: "Hard", prerequisites: ["MA113"] },
            { id: "16", name: "Probability and Statistics-2", code: "ST222", credits: 3, grade: "B", difficulty: "Hard", prerequisites: ["ST121"] },
            { id: "17", name: "Object Oriented Programming", code: "CS213", credits: 3, grade: "B+", difficulty: "Medium", prerequisites: ["CS112"] },
            { id: "18", name: "Operations Research & Decision Support", code: "DS211", credits: 3, grade: "A", difficulty: "Hard", prerequisites: ["ST121"] },
            { id: "19", name: "Logic Design", code: "IT212", credits: 3, grade: "B+", difficulty: "Medium", prerequisites: ["IT111"] },
            { id: "20", name: "Computer Networks Technology", code: "IT221", credits: 3, grade: "B+", difficulty: "Medium", prerequisites: ["IT212"] },

            { id: "21", name: "Social Issues", code: "HU117", credits: 0, grade: "D+", difficulty: "Easy", prerequisites: [] },
            { id: "22", name: "Selected Topics in Humanities", code: "HU118", credits: 2, grade: "C", difficulty: "Easy", prerequisites: [] },
            { id: "23", name: "Data Structures", code: "CS214", credits: 3, grade: "B+", difficulty: "Hard", prerequisites: ["CS213"] },
            { id: "24", name: "Introduction to Software Engineering", code: "CS251", credits: 3, grade: "B", difficulty: "Medium", prerequisites: ["CS213"] },
            { id: "25", name: "Introduction to Database Systems", code: "IS211", credits: 3, grade: "C+", difficulty: "Medium", prerequisites: [] },
            { id: "26", name: "Web Technology", code: "IS231", credits: 3, grade: "B", difficulty: "Medium", prerequisites: ["IS211"] },
            { id: "27", name: "Fundamentals of Management", code: "DS251", credits: 2, grade: "B", difficulty: "Easy", prerequisites: [] },

            { id: "28", name: "Algorithms Analysis and Design", code: "CS321", credits: 3, grade: "B+", difficulty: "Hard", prerequisites: ["CS214"] },
            { id: "29", name: "Operating Systems", code: "CS341", credits: 3, grade: "A+", difficulty: "Hard", prerequisites: ["CS214"] },
            { id: "30", name: "Advanced Software Engineering", code: "CS352", credits: 3, grade: "B", difficulty: "Hard", prerequisites: ["CS251"] },
            { id: "31", name: "Database Management Systems", code: "IS312", credits: 3, grade: "C+", difficulty: "Hard", prerequisites: ["IS211"] },
            { id: "32", name: "File Management and Processing", code: "IS321", credits: 3, grade: "B+", difficulty: "Hard", prerequisites: ["IS312"] },
            { id: "33", name: "Analysis and Design of Information Systems", code: "IS332", credits: 3, grade: "A", difficulty: "Hard", prerequisites: ["IS211"] },
            { id: "34", name: "Artificial Intelligence", code: "CS361", credits: 3, grade: "B+", difficulty: "Hard", prerequisites: ["CS321"] },

            { id: "35", name: "Data Warehousing", code: "IS313", credits: 3, grade: "B", difficulty: "Hard", prerequisites: ["IS312"] },
            { id: "36", name: "Web-based Information Systems Development", code: "IS333", credits: 3, grade: "B+", difficulty: "Hard", prerequisites: ["IS231"] },
            { id: "37", name: "Business Process Management", code: "IS341", credits: 3, grade: "B+", difficulty: "Medium", prerequisites: [] },
            { id: "38", name: "Information Retrieval", code: "IS322", credits: 3, grade: "B", difficulty: "Hard", prerequisites: ["IS312"] },
          ]);

          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleNext = () => {
    if (step === 3 && gradesText) {
      simulateGradeExtraction();
      return;
    }
    if (step < totalSteps) {
      // Validate passwords if on step 1
      if (step === 1) {
        if (localProfile.password !== localProfile.confirmPassword) {
          setPasswordError("Passwords do not match");
          return;
        }
        if (localProfile.password.length < 6) {
          setPasswordError("Password must be at least 6 characters");
          return;
        }
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    updateProfile({
      ...localProfile,
      courses: extractedCourses,
    });
    setHasCompletedSetup(true);
    navigate("/dashboard");
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return localProfile.name && localProfile.email && localProfile.password && localProfile.confirmPassword;
      case 2:
        return localProfile.university && localProfile.college && localProfile.academicYear && localProfile.interests.length > 0;
      case 3:
        return gradesText.trim().length > 0;
      case 4:
        return extractedCourses.length > 0;
      default:
        return true;
    }
  };

  const steps = [
    { number: 1, label: "Account", icon: UserPlus },
    { number: 2, label: "Basic Info", icon: User },
    { number: 3, label: "Grades", icon: ClipboardList },
    { number: 4, label: "Review", icon: Edit3 },
    { number: 5, label: "Complete", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={'/'} >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-gradient">UniMate</span>
              </div>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Step {step} of {totalSteps}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.number
                      ? "bg-gradient-hero text-primary-foreground shadow-glow"
                      : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    {step > s.number ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step >= s.number ? "text-primary" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-20 h-1 mx-2 rounded-full transition-all duration-300 ${step > s.number ? "bg-primary" : "bg-secondary"
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Account Creation */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary-light mx-auto mb-4 flex items-center justify-center">
                      <UserPlus className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Create Your Account</CardTitle>
                    <CardDescription>
                      Start your academic journey with UniMate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Enter your full name"
                            className="pl-10"
                            value={localProfile.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={localProfile.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Create a password"
                            className="pl-10"
                            value={localProfile.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            className="pl-10"
                            value={localProfile.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          />
                        </div>
                        {passwordError && (
                          <p className="text-sm text-destructive mt-2">{passwordError}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Basic Information */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary-light mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
                    <CardDescription>
                      Help us understand your academic background to provide personalized recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">University</label>
                        <Select
                          value={localProfile.university}
                          onValueChange={(value) => setLocalProfile((prev) => ({ ...prev, university: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your university" />
                          </SelectTrigger>
                          <SelectContent>
                            {universities.map((uni) => (
                              <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">College</label>
                        <Select
                          value={localProfile.college}
                          onValueChange={(value) => setLocalProfile((prev) => ({ ...prev, college: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your college" />
                          </SelectTrigger>
                          <SelectContent>
                            {colleges.map((col) => (
                              <SelectItem key={col} value={col}>{col}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Major
                        </label>
                        <Select
                          value={localProfile.major}
                          onValueChange={(value) =>
                            setLocalProfile((prev) => ({ ...prev, major: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your major" />
                          </SelectTrigger>
                          <SelectContent>
                            {majors.map((major) => (
                              <SelectItem key={major} value={major}>
                                {major}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Academic Year</label>
                        <Select
                          value={localProfile.academicYear}
                          onValueChange={(value) => setLocalProfile((prev) => ({ ...prev, academicYear: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">Interests (select all that apply)</label>
                      <div className="grid grid-cols-2 gap-3">
                        {interests.map((interest) => (
                          <div
                            key={interest.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${localProfile.interests.includes(interest.id)
                              ? "border-primary bg-primary-light"
                              : "border-border hover:border-primary/30"
                              }`}
                            onClick={() => handleInterestToggle(interest.id)}
                          >
                            <Checkbox
                              checked={localProfile.interests.includes(interest.id)}
                              onCheckedChange={() => handleInterestToggle(interest.id)}
                            />
                            <span className="text-sm font-medium">{interest.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Grades Input */}
            {step === 3 && !extractedCourses.length && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent-light mx-auto mb-4 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-accent" />
                    </div>
                    <CardTitle className="text-2xl">Paste Your Academic Grades</CardTitle>
                    <CardDescription>
                      Copy your grades directly from your official college website and paste them below.
                      UniMate will automatically extract the required data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Textarea
                      placeholder={exampleGrades}
                      className="min-h-[250px] font-mono text-sm"
                      value={gradesText}
                      onChange={(e) => setGradesText(e.target.value)}
                    />

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary">
                      <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">Your data is safe</p>
                        <ul className="space-y-1">
                          <li>• We only extract course names, credits, and grades</li>
                          <li>• You can review and edit extracted data</li>
                          <li>• Your information is never shared with third parties</li>
                        </ul>
                      </div>
                    </div>

                    {isProcessing && (
                      <div className="p-6 rounded-lg bg-gradient-subtle text-center">
                        <Loader2 className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
                        <p className="text-foreground font-medium">{processingMessages[processingStep]}</p>
                        <Progress value={(processingStep + 1) * 25} variant="ai" className="mt-4" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Review Extracted Data */}
            {step === 3 && extractedCourses.length > 0 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-success-light mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <CardTitle className="text-2xl">Grades Extracted Successfully!</CardTitle>
                    <CardDescription>
                      Review the extracted courses below. You can edit any information if needed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {extractedCourses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                          <div>
                            <p className="font-medium text-foreground">{course.name}</p>
                            <p className="text-sm text-muted-foreground">{course.code} • {course.credits} credits</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={course.grade?.startsWith("A") ? "success-light" : "secondary"}>
                              {course.grade}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Profile Validation */}
            {step === 4 && (
              <motion.div
                key="step4validation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
                    <CardDescription>
                      Complete your profile to unlock all UniMate features.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "Account Created", status: "complete", description: "Name and email verified" },
                      { label: "Basic Information", status: "complete", description: "University, college, and year" },
                      { label: "Grades Uploaded", status: "complete", description: `${extractedCourses.length} courses extracted` },
                      { label: "Interests Selected", status: "complete", description: `${localProfile.interests.length} interests chosen` },
                      { label: "Career Preferences", status: "optional", description: "Set after exploring careers" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === "complete" ? "bg-success-light" :
                            item.status === "warning" ? "bg-warning-light" : "bg-secondary"
                            }`}>
                            {item.status === "complete" && <CheckCircle2 className="w-5 h-5 text-success" />}
                            {item.status === "warning" && <span className="text-warning">!</span>}
                            {item.status === "optional" && <span className="text-muted-foreground">-</span>}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        {item.status !== "complete" && (
                          <Button variant="outline" size="sm">
                            {item.status === "optional" ? "Skip for now" : "Fix now"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 5: Complete */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated" className="text-center">
                  <CardContent className="py-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-hero mx-auto mb-6 flex items-center justify-center animate-float">
                      <Sparkles className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">You're all set!</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                      Your profile is ready. Let's explore your personalized recommendations and start planning your academic journey.
                    </p>
                    <Button variant="hero" size="xl" onClick={handleComplete}>
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  if (step === 3 && !extractedCourses.length) {
                    handleNext();
                  } else {
                    setStep(step + 1);
                  }
                }}
                disabled={!canProceed() || isProcessing}
                className="gap-2"
              >
                {step === 3 && !extractedCourses.length ? "Analyze Grades" : "Continue"}
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
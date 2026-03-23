import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Bell,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { mockCourses, mockMajors, mockCareers, mockSkills } from "@/data/mockData";

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
            <p className="text-muted-foreground mt-1">Here's your personalized academic overview.</p>
          </div>
          <Link to="/chat">
            <Button variant="ai" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Ask AI Assistant
            </Button>
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Current GPA", value: "3.54", change: "+0.12", icon: Target, color: "primary" },
            { label: "Credits Completed", value: "68", change: "/ 120", icon: BookOpen, color: "accent" },
            { label: "Major Match", value: "92%", change: "CS", icon: GraduationCap, color: "success" },
            { label: "Skills Progress", value: "65%", change: "4 gaps", icon: TrendingUp, color: "warning" },
          ].map((stat, index) => (
            <Card key={index} variant="default">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}-light flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recommended Courses */}
          <motion.div variants={itemVariants}>
            <Card variant="default">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Recommended Next Courses
                  </CardTitle>
                  <CardDescription>Based on your interests and progress</CardDescription>
                </div>
                <Link to="/courses">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{course.name}</p>
                        <Badge variant={course.prerequisitesMet ? "success-light" : "warning-light"} className="text-xs">
                          {course.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{course.code} • {course.credits} credits</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Why?
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Matching Majors */}
          <motion.div variants={itemVariants}>
            <Card variant="default">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-accent" />
                    Top Matching Majors
                  </CardTitle>
                  <CardDescription>Based on your profile analysis</CardDescription>
                </div>
                <Link to="/majors">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Compare
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMajors.slice(0, 3).map((major) => (
                  <div key={major.id} className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{major.name}</p>
                      <Badge variant="primary" className="text-xs">
                        {major.matchPercentage}% match
                      </Badge>
                    </div>
                    <Progress value={major.matchPercentage} variant="ai" className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Career Paths */}
          <motion.div variants={itemVariants}>
            <Card variant="default">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-success" />
                    Suggested Career Paths
                  </CardTitle>
                  <CardDescription>Aligned with your skills and goals</CardDescription>
                </div>
                <Link to="/careers">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCareers.slice(0, 3).map((career) => (
                  <div key={career.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{career.title}</p>
                      <p className="text-sm text-muted-foreground">{career.requiredSkills.slice(0, 3).join(", ")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-success">{career.matchScore}%</p>
                      <p className="text-xs text-muted-foreground">match</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Skill Gaps */}
          <motion.div variants={itemVariants}>
            <Card variant="default">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-warning" />
                    Missing Skills Overview
                  </CardTitle>
                  <CardDescription>Areas to improve for your goals</CardDescription>
                </div>
                <Link to="/skills">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSkills.slice(0, 3).map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{skill.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {skill.currentLevel}% / {skill.targetLevel}%
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={skill.currentLevel} variant="warning" className="h-2" />
                      <div 
                        className="absolute top-0 h-2 w-0.5 bg-foreground/30 rounded"
                        style={{ left: `${skill.targetLevel}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Assistant Banner */}
        <motion.div variants={itemVariants}>
          <Card variant="ai">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-ai flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Have questions about your academic plan?</h3>
                    <p className="text-sm text-muted-foreground">
                      Chat with our AI assistant for personalized guidance and explanations.
                    </p>
                  </div>
                </div>
                <Link to="/chat">
                  <Button variant="ai">
                    Start Chatting
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
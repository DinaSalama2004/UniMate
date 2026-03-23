import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  BookOpen,
  Clock,
  ChevronRight,
  Settings2,
  Zap,
  CalendarDays,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
import { mockStudyPlan } from "@/data/mockData";
import { useState } from "react";

export default function StudyPlan() {
  const [lighterWorkload, setLighterWorkload] = useState(false);
  const [electiveFocus, setElectiveFocus] = useState(false);
  const [endDate, setEndDate] = useState("2026-06-15");

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case "Low": return "success";
      case "Medium": return "warning";
      case "High": return "destructive";
      default: return "secondary";
    }
  };

  const calculateSemesterCount = () => {
    // Simple calculation - you can make this more sophisticated
    const startYear = 2024; // Assuming current year
    const endYear = parseInt(endDate.split('-')[0]);
    const years = endYear - startYear;
    return years * 2; // Assuming 2 semesters per year
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Study Plan</h1>
            <p className="text-muted-foreground mt-1">
              Your semester-by-semester academic roadmap
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Settings2 className="w-4 h-4" />
            Regenerate Plan
          </Button>
        </div>

        {/* Timeline Configuration */}
        <Card variant="default">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Timeline Configuration
            </CardTitle>
            <CardDescription>
              Customize your academic journey timeline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date Info */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </Label>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Present Semester</p>
                      <p className="text-sm text-muted-foreground">
                        Your study plan starts from the current semester
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 rounded bg-primary/5 border border-primary/10">
                    <p className="text-sm text-primary flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Plan is automatically adjusted based on your current progress
                    </p>
                  </div>
                </div>
              </div>

              {/* End Date Input */}
              <div className="space-y-3">
                <Label htmlFor="end-date" className="text-sm font-medium flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Expected Graduation Date
                </Label>
                <div className="space-y-3">
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="end-date"
                      type="date"
                      className="pl-10"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estimated timeline:</span>
                      <Badge variant="outline">
                        {calculateSemesterCount()} semesters
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Adjust this date to see how it affects your study plan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Switch checked={lighterWorkload} onCheckedChange={setLighterWorkload} />
                  <span className="text-sm font-medium">Lighter Workload</span>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={electiveFocus} onCheckedChange={setElectiveFocus} />
                  <span className="text-sm font-medium">Elective Focus</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4" />
                AI-optimized for your goals
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {mockStudyPlan.map((semester, index) => (
              <motion.div
                key={semester.semester}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 w-5 h-5 rounded-full bg-primary hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                </div>

                <Card variant="default" className="md:ml-16">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{semester.year}</CardTitle>
                          <CardDescription>Semester {semester.semester}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{semester.totalCredits} credits</p>
                          <Badge variant={`${getWorkloadColor(semester.workload)}-light` as any}>
                            {semester.workload} workload
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {semester.courses.map((course) => (
                        <div
                          key={course.id}
                          className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-foreground">{course.name}</p>
                              <p className="text-sm text-muted-foreground">{course.code}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {course.credits} cr
                            </span>
                            <Badge variant={
                              course.difficulty === "Easy" ? "success-light" :
                              course.difficulty === "Medium" ? "warning-light" : "destructive-light"
                            } className="text-xs">
                              {course.difficulty}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
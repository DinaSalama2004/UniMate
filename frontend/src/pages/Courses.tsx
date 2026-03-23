import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle,
  Sparkles,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { mockCourses } from "@/data/mockData";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<typeof mockCourses[0] | null>(null);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Course Recommendations</h1>
            <p className="text-muted-foreground mt-1">
              Personalized course suggestions based on your profile and goals
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Regenerate
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Badge variant="primary" className="cursor-pointer">All Courses</Badge>
          <Badge variant="secondary" className="cursor-pointer">Required</Badge>
          <Badge variant="secondary" className="cursor-pointer">Electives</Badge>
          <Badge variant="secondary" className="cursor-pointer">Prerequisites Met</Badge>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="interactive" className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription className="mt-1">{course.code}</CardDescription>
                    </div>
                    <Badge 
                      variant={
                        course.difficulty === "Easy" ? "success-light" :
                        course.difficulty === "Medium" ? "warning-light" : "destructive-light"
                      }
                    >
                      {course.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{course.credits} credits</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {course.prerequisitesMet ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          Prerequisites met
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-warning" />
                          Prerequisites needed
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.reason}
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-1"
                          onClick={() => setSelectedCourse(course)}
                        >
                          <Info className="w-4 h-4" />
                          Why this?
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Why we recommend {course.name}</DialogTitle>
                          <DialogDescription>
                            Here's why this course is a great fit for you
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="p-4 rounded-lg bg-primary-light">
                            <h4 className="font-medium text-foreground mb-2">AI Analysis</h4>
                            <p className="text-sm text-muted-foreground">{course.reason}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Prerequisites</h4>
                            {course.prerequisites.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {course.prerequisites.map((prereq) => (
                                  <Badge key={prereq} variant="secondary">{prereq}</Badge>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No prerequisites required</p>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ai" size="sm" className="flex-1 gap-1">
                      <MessageCircle className="w-4 h-4" />
                      Discuss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
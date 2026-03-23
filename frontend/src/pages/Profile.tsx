import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockProfileInterests, mockProfileSkills, mockProfileCourses } from "@/data/mockData";

import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Bell, 
  Edit, 
  RefreshCw,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProfile } from "@/context/ProfileContext";
import { mockMajors, mockCareers, mockAnnouncements } from "@/data/mockData";

export default function Profile() {
  const { profile, profileCompletion } = useProfile();

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

  // Mock saved items (in a real app, this would come from context or API)
  const savedMajors = mockMajors.slice(0, 2);
  const savedCareers = mockCareers.slice(0, 2);
  const savedAnnouncements = mockAnnouncements.filter(a => a.saved);

  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 max-w-4xl mx-auto"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
            <p className="text-muted-foreground mt-1">View and manage your academic profile</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Re-run Analysis
            </Button>
            <Link to="/setup">
              <Button variant="default" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Profile Overview Card */}
        <motion.div variants={itemVariants}>
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Overview
              </CardTitle>
              <CardDescription>Your basic academic information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Shahd Essam</h3>
                      <p className="text-sm text-muted-foreground">UniMate User</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">University</span>
                      <span className="text-sm font-medium text-foreground">
                        {profile.university || "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">College</span>
                      <span className="text-sm font-medium text-foreground">
                        {profile.college || "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Major</span>
                      <span className="text-sm font-medium text-foreground">
                        {"Information Systems"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Academic Year</span>
                      <span className="text-sm font-medium text-foreground">
                        {profile.academicYear || "Not set"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Profile Completeness</span>
                      <span className="text-sm font-semibold text-primary">{profileCompletion}%</span>
                    </div>
                    <Progress value={profileCompletion} variant="primary" className="h-3" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {profile.university ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      )}
                      <span className="text-sm text-muted-foreground">Basic information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {profile.courses.length > 0 ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      )}
                      <span className="text-sm text-muted-foreground">Grades uploaded</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {profile.interests.length > 0 ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      )}
                      <span className="text-sm text-muted-foreground">Interests selected</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Academic Summary Card */}
        <motion.div variants={itemVariants}>
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent" />
                Academic Summary
              </CardTitle>
              <CardDescription>Your academic progress and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-3xl font-bold text-foreground">
                    {profile.gpa ? profile.gpa.toFixed(2) : "3.54"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Current GPA</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-3xl font-bold text-foreground">{profile.courses.length || 12}</p>
                  <p className="text-sm text-muted-foreground mt-1">Courses Uploaded</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-3xl font-bold text-foreground">{profile.interests.length || 4}</p>
                  <p className="text-sm text-muted-foreground mt-1">Interests Selected</p>
                </div>
              </div>

              {profile.interests.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground mb-3">Selected Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {profile.interests.length === 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground mb-3">Selected Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {["Artificial Intelligence", "Web Development", "Data Science", "Mobile Apps"].map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        {/* Interests & Skills */}
<motion.div variants={itemVariants}>
  <Card variant="default">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-success" />
        Interests & Skills
      </CardTitle>
      <CardDescription>
        What you’re interested in and what you’re good at
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-6">
      {/* Interests */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Interests</p>
        <div className="flex flex-wrap gap-2">
          {mockProfileInterests.map((interest, index) => (
            <Badge key={index} variant="secondary">
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Skills</p>
        <div className="flex flex-wrap gap-2">
          {mockProfileSkills.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
</motion.div>
{/* Registered Courses */}
<motion.div variants={itemVariants}>
  <Card variant="default">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Registered Courses
      </CardTitle>
      <CardDescription>
        Courses you have registered or completed
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-3">
      {mockProfileCourses.length > 0 ? (
        mockProfileCourses.map((course) => (
          <div
            key={course.id}
            className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  {course.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {course.code}
                </p>
              </div>

              <div className="text-right">
                {course.grade ? (
                  <Badge variant="success-light">{course.grade}</Badge>
                ) : (
                  <Badge variant="warning-light">In Progress</Badge>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {course.status}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          No registered courses yet
        </p>
      )}
    </CardContent>
  </Card>
</motion.div>



        {/* Saved Items Section */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          {/* Saved Majors */}
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-primary" />
                Saved Majors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedMajors.length > 0 ? (
                savedMajors.map((major) => (
                  <div key={major.id} className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{major.name}</p>
                      <Badge variant="primary" className="text-xs">
                        {major.matchPercentage}% match
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No saved majors yet
                </p>
              )}
              <Link to="/majors">
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View All Majors
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Saved Careers */}
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5 text-success" />
                Saved Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedCareers.length > 0 ? (
                savedCareers.map((career) => (
                  <div key={career.id} className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{career.title}</p>
                      <Badge variant="success-light" className="text-xs">
                        {career.matchScore}% match
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No saved careers yet
                </p>
              )}
              <Link to="/careers">
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View All Careers
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Saved Announcements */}
        <motion.div variants={itemVariants}>
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-warning" />
                Saved Announcements
              </CardTitle>
              <CardDescription>Announcements you've bookmarked</CardDescription>
            </CardHeader>
            <CardContent>
              {savedAnnouncements.length > 0 ? (
                <div className="space-y-3">
                  {savedAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{announcement.title}</p>
                          <p className="text-sm text-muted-foreground">{announcement.date}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {announcement.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No saved announcements yet
                </p>
              )}
              <Link to="/announcements">
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Announcements
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}

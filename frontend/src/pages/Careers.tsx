import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  Bookmark,
  Building2,
  GraduationCap,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { mockCareers } from "@/data/mockData";
import { useState } from "react";

export default function Careers() {
  const [savedCareers, setSavedCareers] = useState<string[]>([]);

  const toggleSave = (careerId: string) => {
    setSavedCareers(prev => 
      prev.includes(careerId) 
        ? prev.filter(id => id !== careerId)
        : [...prev, careerId]
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Career Paths</h1>
            <p className="text-muted-foreground mt-1">
              Discover careers aligned with your skills and interests
            </p>
          </div>
          {savedCareers.length > 0 && (
            <Badge variant="primary">{savedCareers.length} saved</Badge>
          )}
        </div>

        {/* Careers Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {mockCareers.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="interactive" className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-success-light flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{career.title}</CardTitle>
                        <CardDescription>{career.description}</CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleSave(career.id)}
                    >
                      <Bookmark 
                        className={`w-5 h-5 ${savedCareers.includes(career.id) ? "fill-primary text-primary" : ""}`} 
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Match Score */}
                  <div className="p-4 rounded-lg bg-success-light">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-success">Match Score</span>
                      <span className="text-2xl font-bold text-success">{career.matchScore}%</span>
                    </div>
                    <Progress value={career.matchScore} variant="success" />
                  </div>

                  {/* Required Skills */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Required Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-accent" />
                      Top Industries
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {career.suggestedIndustries.map((industry) => (
                        <Badge key={industry} variant="outline">{industry}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Internships */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-warning" />
                      Recommended Internships
                    </h4>
                    <ul className="space-y-1">
                      {career.internships.map((internship, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                          {internship}
                        </li>
                      ))}
                    </ul>
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
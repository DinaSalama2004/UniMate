import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  ArrowLeftRight,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { mockMajors } from "@/data/mockData";
import { useState } from "react";

export default function Majors() {
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);

  const toggleMajor = (majorId: string) => {
    setSelectedMajors(prev =>
      prev.includes(majorId)
        ? prev.filter(id => id !== majorId)
        : prev.length < 2 ? [...prev, majorId] : prev
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Major Guidance</h1>
            <p className="text-muted-foreground mt-1">
              Explore majors that match your profile and career goals
            </p>
          </div>
          {selectedMajors.length === 2 && (
            <Button variant="default" className="gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              Compare Selected
            </Button>
          )}
        </div>

        {/* Info Banner */}


        {/* Majors Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockMajors.map((major, index) => (
            <motion.div
              key={major.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant={selectedMajors.includes(major.id) ? "primary" : "interactive"}
                className={`h-full ${selectedMajors.includes(major.id) ? "ring-2 ring-primary" : ""}`}
                onClick={() => toggleMajor(major.id)}
              >
                <CardHeader>

                  <div className="flex items-start justify-between">
                    <div>

                      <CardTitle className="text-xl">{major.name}</CardTitle>
                      <CardDescription className="mt-1">{major.description}</CardDescription>
                    </div>

                    <Badge variant="ai" className="text-sm">
                      {major.matchPercentage}%
                    </Badge>
                    {/* Actions */}
                    <div>

                      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Match Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Profile Match</span>
                      <span className="font-medium text-foreground">{major.matchPercentage}%</span>
                    </div>
                    <Progress value={major.matchPercentage} variant="ai" />
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Your Strengths
                    </h4>
                    <ul className="space-y-1">
                      {major.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-success">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      Potential Challenges
                    </h4>
                    <ul className="space-y-1">
                      {major.challenges.map((challenge, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-warning">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Careers */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Career Paths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {major.careers.map((career) => (
                        <Badge key={career} variant="secondary">{career}</Badge>
                      ))}
                    </div>
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
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Bookmark, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { mockSkills } from "@/data/mockData";

export default function Skills() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Skill Gap Analysis</h1>
          <p className="text-muted-foreground mt-1">Identify and close gaps to reach your career goals</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {mockSkills.map((skill, index) => (
            <motion.div key={skill.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card variant="default">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-warning" />
                      {skill.name}
                    </CardTitle>
                    <Badge variant="warning-light">{skill.targetLevel - skill.currentLevel}% gap</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Current: {skill.currentLevel}%</span>
                      <span className="text-foreground font-medium">Target: {skill.targetLevel}%</span>
                    </div>
                    <Progress value={skill.currentLevel} variant="warning" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recommended Resources</p>
                    {skill.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{resource.type}</Badge>
                          <span className="text-sm">{resource.title}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon"><Bookmark className={`w-4 h-4 ${resource.saved ? "fill-primary text-primary" : ""}`} /></Button>
                          <Button variant="ghost" size="icon"><ExternalLink className="w-4 h-4" /></Button>
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
    </AppLayout>
  );
}
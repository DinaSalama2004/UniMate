import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  GraduationCap,
  Calendar,
  Briefcase,
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "Smart Major Selection",
    description: "AI analyzes your grades, interests, and strengths to recommend the perfect major for your goals.",
  },
  {
    icon: Calendar,
    title: "Personalized Study Plans",
    description: "Get semester-by-semester course recommendations tailored to your workload preferences.",
  },
  {
    icon: Target,
    title: "Career & Skill Alignment",
    description: "Discover career paths that match your profile and identify skill gaps to work on.",
  },
];

const stats = [
  { value: "10K+", label: "Students Helped" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "200+", label: "Courses Analyzed" },
  { value: "50+", label: "Career Paths" },
];

const currentYear = new Date().getFullYear();


export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-10">
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-gradient">UniMate</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </Link>

              <Link to="/setup">
                <Button variant="hero" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>


          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary-dark text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Academic Planning
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Plan Your University Journey{" "}
              <span className="text-gradient">Intelligently</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Get personalized course, major, and career recommendations powered by AI.
              Make informed decisions about your academic future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-4"
            >
              <Link to="/setup">
                <Button variant="hero" size="xl" className="gap-2">
                  Start Planning
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need To Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              UniMate combines AI intelligence with academic expertise to guide you
              through every step of your university journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="interactive" className="h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6">
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How UniMate works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to transform your academic planning
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Share your academic profile",
                description: "Paste your grades, select your interests, and tell us about your goals.",
              },
              {
                step: "02",
                title: "Get AI-powered insights",
                description: "Our AI analyzes your profile to generate personalized recommendations.",
              },
              {
                step: "03",
                title: "Plan with confidence",
                description: "Explore majors, courses, and careers with clear explanations for every suggestion.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Card variant="elevated" className="bg-gradient-hero overflow-hidden">
            <CardContent className="p-12 md:p-16 text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
              <div className="relative z-10">
                <GraduationCap className="w-16 h-16 text-primary-foreground mx-auto mb-6 animate-float" />
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to plan your future?
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                  Join thousands of students who are making smarter academic decisions with UniMate.
                </p>
                <Link to="/setup">
                  <Button
                    size="xl"
                    className="bg-card text-foreground hover:bg-card/90 shadow-xl"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-gradient">UniMate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              ©{currentYear} UniMate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
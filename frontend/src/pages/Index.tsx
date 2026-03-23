import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Home } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto mb-6 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gradient">UniMate</h1>
        <p className="text-xl text-muted-foreground mb-8">AI-powered academic planning platform</p>
        <Link to="/">
          <Button variant="hero" size="lg" className="gap-2">
            <Home className="w-5 h-5" />
            Go to Landing Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
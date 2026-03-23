import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProfile } from "@/context/ProfileContext";
import { NotificationsPanel } from "@/components/notifications/NotificationsPanel";
import { Link } from "react-router-dom";

export function TopBar() {
  const { profileCompletion } = useProfile();

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Profile Completion */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Profile:</span>
            <div className="w-32">
              <Progress value={profileCompletion} variant="primary" />
            </div>
            <span className="text-sm font-semibold text-primary">{profileCompletion}% complete</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <NotificationsPanel />
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
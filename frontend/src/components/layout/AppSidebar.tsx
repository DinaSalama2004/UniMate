import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Bell, 
  MessageCircle,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LogoutDialog } from "./LogoutDialog";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Course Recommendations", href: "/courses", icon: BookOpen },
  { name: "Major Guidance", href: "/majors", icon: GraduationCap },
  { name: "Career Paths", href: "/careers", icon: Briefcase },
  { name: "Study Plan", href: "/study-plan", icon: Calendar },
  { name: "Skill Gaps", href: "/skills", icon: TrendingUp },
  { name: "Announcements", href: "/announcements", icon: Bell, badge: 3 },
  { name: "AI Chat", href: "/chat", icon: MessageCircle, isAi: true },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">UniMate</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                item.isAi && !isActive && "text-accent"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <Badge variant={isActive ? "secondary" : "default"} className="text-xs">
                  {item.badge}
                </Badge>
              )}
              {item.isAi && !isActive && (
                <Badge variant="ai" className="text-xs">AI</Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-border space-y-2">
        <LogoutDialog showText />
        <div className="p-4 rounded-lg bg-gradient-subtle">
          <p className="text-xs text-muted-foreground">
            Need help? Chat with our AI assistant to get personalized guidance.
          </p>
        </div>
      </div>
    </aside>
  );
}
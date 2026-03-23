import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check, PartyPopper, ChevronRight, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mockAnnouncements } from "@/data/mockData";

interface Notification {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsPanel() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(
    mockAnnouncements.slice(0, 5).map((a, index) => ({
      id: a.id,
      title: a.title,
      category: a.category,
      timestamp: a.date,
      read: index > 2,
    }))
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    setOpen(false);
    navigate("/announcements");
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "event":
        return "primary";
      case "scholarship":
        return "success-light";
      case "internship":
        return "warning-light";
      case "competition":
        return "ai";
      default:
        return "secondary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-md w-[95vw] p-0 max-h-[90vh] flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-4 pt-4 pb-3 border-b sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">Notifications</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 me-3">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="h-8 px-3 text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Mark all
                </Button>
              )}
        
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-4 sm:px-6">
          {notifications.length > 0 ? (
            <div className="py-3 space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="group"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div
                    className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      notification.read
                        ? "bg-background border-border hover:bg-secondary/50 hover:border-border/70"
                        : "bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        notification.read ? "bg-transparent" : "bg-primary animate-pulse"
                      }`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm truncate ${
                              notification.read ? "text-foreground" : "text-foreground"
                            }`}>
                              {notification.title}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </p>
                          <Badge
                            variant={getCategoryColor(notification.category) as any}
                            className="text-xs capitalize px-2 py-0.5"
                          >
                            {notification.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                <PartyPopper className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground mb-2">
                All caught up! 🎉
              </p>
              <p className="text-sm text-muted-foreground">
                No new notifications at the moment
              </p>
            </div>
          )}
        </ScrollArea>

        <div className="px-4 py-3 border-t border-border mt-auto sm:px-6">
          <Link to="/announcements" onClick={() => setOpen(false)}>
            <Button 
              variant="outline" 
              className="w-full h-10 hover:bg-secondary/50"
            >
              View All Announcements
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
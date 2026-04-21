import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Bookmark, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchAPI, extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import { Announcement } from "@/types/announcement";

const categoryColors: Record<string, string> = {
  event: "primary",
  scholarship: "success",
  internship: "accent",
  competition: "warning",
  notice: "secondary",
};

export default function Announcements() {
  const [filter, setFilter] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data: Announcement[] = await fetchAPI("/announcements/");

        // ✅ show only published
        const publishedOnly = data.filter(
          (a) => a.status === "published"
        );

        setAnnouncements(publishedOnly);
      } catch (err) {
        toast.error(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FILTER
  const filtered = filter
    ? announcements.filter((a) => a.category === filter)
    : announcements;

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Announcements
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with opportunities and news
            </p>
          </div>

          {/* (optional) dynamic count بدل 3 new */}
          <Badge variant="primary">
            <Bell className="w-3 h-3 mr-1" />
            {announcements.length} new
          </Badge>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={!filter ? "primary" : "secondary"}
            className="cursor-pointer"
            onClick={() => setFilter(null)}
          >
            All
          </Badge>

          {["event", "scholarship", "internship", "competition", "notice"].map(
            (cat) => (
              <Badge
                key={cat}
                variant={filter === cat ? "primary" : "secondary"}
                className="cursor-pointer capitalize"
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Badge>
            )
          )}
        </div>

        {/* LIST */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="interactive">
                  <CardContent className="p-4 flex items-start justify-between">

                    {/* LEFT */}
                    <div className="flex gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg bg-${categoryColors[item.category]}-light flex items-center justify-center flex-shrink-0`}
                      >
                        <Bell
                          className={`w-5 h-5 text-${categoryColors[item.category]}`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">
                            {item.title}
                          </h3>

                          <Badge
                            variant="outline"
                            className="capitalize text-xs"
                          >
                            {item.category}
                          </Badge>
                        </div>

                        {/* ✅ content بدل description */}
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.content}
                        </p>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <Button variant="ghost" size="icon">
                      <Bookmark className="w-4 h-4" />
                    </Button>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
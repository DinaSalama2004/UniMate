import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Calendar, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Announcement } from "@/types/announcement";
import {
  getAllAnnouncements,
  deleteAnnouncement,
} from "@/api/announcementApi";
import { extractErrorMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const categoryColors: Record<string, string> = {
  event: "primary",
  scholarship: "success",
  internship: "accent",
  competition: "warning",
  notice: "secondary",
};

export default function AdminAnnouncements() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        toast({
          title: "Error",
          description: extractErrorMessage(error),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // FILTER
  const filtered = announcements.filter((a) => {
    if (categoryFilter && a.category !== categoryFilter) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  });

  // DELETE
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteAnnouncement(deleteId);

      setAnnouncements((prev) =>
        prev.filter((a) => a.id !== Number(deleteId))
      );

      toast({
        title: "Deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: extractErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Announcements Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, manage, and publish announcements visible to students.
            </p>
          </div>

          <Link to="/admin/announcements/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </Link>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">
          {/* CATEGORY */}
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Category:
            </span>

            <Badge
              variant={!categoryFilter ? "primary" : "secondary"}
              className="cursor-pointer"
              onClick={() => setCategoryFilter(null)}
            >
              All
            </Badge>

            {["event", "scholarship", "internship", "competition", "notice"].map((cat) => (
              <Badge
                key={cat}
                variant={categoryFilter === cat ? "primary" : "secondary"}
                className="cursor-pointer capitalize"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* STATUS */}
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Status:
            </span>

            <Badge
              variant={!statusFilter ? "primary" : "secondary"}
              className="cursor-pointer"
              onClick={() => setStatusFilter(null)}
            >
              All
            </Badge>

            <Badge
              variant={statusFilter === "published" ? "primary" : "secondary"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("published")}
            >
              Published
            </Badge>

            <Badge
              variant={statusFilter === "draft" ? "primary" : "secondary"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("draft")}
            >
              Draft
            </Badge>
          </div>
        </div>

        {/* LIST */}
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No announcements yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first one to notify students.
              </p>

              <Link to="/admin/announcements/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Announcement
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg bg-${categoryColors[item.category]}-light flex items-center justify-center`}
                      >
                        <Bell className={`w-5 h-5 text-${categoryColors[item.category]}`} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium truncate">
                            {item.title}
                          </h3>

                          {/* CATEGORY */}
                          <Badge variant="outline" className="capitalize text-xs">
                            {item.category}
                          </Badge>

                          {/* STATUS */}
                          <Badge
                            variant={
                              item.status === "published"
                                ? "success"
                                : "warning"
                            }
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          navigate(`/admin/announcements/edit/${item.id}`)
                        }
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(String(item.id))}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE DIALOG */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this announcement?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
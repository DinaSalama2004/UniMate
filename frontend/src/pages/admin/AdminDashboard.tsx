import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, FileText, Users } from "lucide-react";
import { mockAdminAnnouncements } from "@/data/adminMockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const published = mockAdminAnnouncements.filter(a => a.status === "published").length;
  const drafts = mockAdminAnnouncements.filter(a => a.status === "draft").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your UniMate platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockAdminAnnouncements.length}</p>
                <p className="text-sm text-muted-foreground">Total Announcements</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-success-light flex items-center justify-center">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{published}</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{drafts}</p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Link to="/admin/announcements">
              <Button>Manage Announcements</Button>
            </Link>
            <Link to="/admin/announcements/new">
              <Button variant="outline">Create Announcement</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

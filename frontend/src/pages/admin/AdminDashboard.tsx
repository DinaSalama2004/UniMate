import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, FileText, Users } from "lucide-react";
import { mockAdminAnnouncements } from "@/data/adminMockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAPI, extractErrorMessage } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AdminDashboard() {
  const published = mockAdminAnnouncements.filter(a => a.status === "published").length;
  const drafts = mockAdminAnnouncements.filter(a => a.status === "draft").length;
  const { role } = useAuth();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  const [deleteAdminEmail, setDeleteAdminEmail] = useState("");
  const [isDeletingAdmin, setIsDeletingAdmin] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsCreatingAdmin(true);
      await fetchAPI("/create-admin", {
        method: "POST",
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      toast.success("Admin created successfully!");
      setAdminEmail("");
      setAdminPassword("");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteAdminEmail) {
      toast.error("Please provide the Admin Email");
      return;
    }

    try {
      setIsDeletingAdmin(true);
      await fetchAPI(`/admin/${encodeURIComponent(deleteAdminEmail)}`, {
        method: "DELETE",
      });
      toast.success(`Admin ${deleteAdminEmail} deleted successfully!`);
      setDeleteAdminEmail("");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setIsDeletingAdmin(false);
    }
  };

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

        {role === "super_admin" && (
          <Card>
            <CardHeader>
              <CardTitle>Super Admin: Create New Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAdmin} className="flex gap-4 items-end flex-wrap">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email</Label>
                  <Input 
                    id="adminEmail" 
                    type="email" 
                    value={adminEmail} 
                    onChange={e => setAdminEmail(e.target.value)} 
                    placeholder="admin@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Password</Label>
                  <Input 
                    id="adminPassword" 
                    type="password" 
                    value={adminPassword} 
                    onChange={e => setAdminPassword(e.target.value)} 
                    placeholder="Secret Password"
                  />
                </div>
                <Button type="submit" disabled={isCreatingAdmin}>
                  {isCreatingAdmin ? "Creating..." : "Create Admin"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {role === "super_admin" && (
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="text-destructive">Super Admin: Delete Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeleteAdmin} className="flex gap-4 items-end flex-wrap">
                <div className="space-y-2">
                  <Label htmlFor="deleteAdminEmail">Admin User Email</Label>
                  <Input 
                    id="deleteAdminEmail" 
                    type="email"
                    value={deleteAdminEmail} 
                    onChange={e => setDeleteAdminEmail(e.target.value)} 
                    placeholder="admin@example.com" 
                  />
                </div>
                <Button variant="destructive" type="submit" disabled={isDeletingAdmin}>
                  {isDeletingAdmin ? "Deleting..." : "Delete Admin"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

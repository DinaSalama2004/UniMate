import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockAdminAnnouncements } from "@/data/adminMockData";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "event", label: "Event" },
  { value: "internship", label: "Internship" },
  { value: "scholarship", label: "Scholarship" },
  { value: "competition", label: "Competition" },
  { value: "notice", label: "Notice" },
];

export default function AdminAnnouncementForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEdit = !!id;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit) {
      const existing = mockAdminAnnouncements.find((a) => a.id === id);
      if (existing) {
        setTitle(existing.title);
        setCategory(existing.category);
        setContent(existing.content);
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (status: "published" | "draft") => {
    if (!title.trim() || !category || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: status === "published" ? "Announcement Published" : "Draft Saved",
      description:
        status === "published"
          ? "The announcement is now visible to students."
          : "Your draft has been saved.",
    });
    navigate("/admin/announcements");
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEdit ? "Edit Announcement" : "New Announcement"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEdit
              ? "Update the announcement details below."
              : "Fill in the details to create a new announcement."}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Announcement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write the announcement content..."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={() => handleSubmit("published")}>
                Publish Announcement
              </Button>
              <Button variant="outline" onClick={() => handleSubmit("draft")}>
                Save Draft
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/announcements")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

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
import { useToast } from "@/hooks/use-toast";

import {
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
} from "@/api/announcementApi";

import { AnnouncementStatus } from "@/types/announcement";
import { extractErrorMessage } from "@/lib/api";

const categories = [
  { value: "event", label: "Event" },
  { value: "internship", label: "Internship" },
  { value: "scholarship", label: "Scholarship" },
  { value: "competition", label: "Competition" },
  { value: "notice", label: "Notice" },
];

export default function AdminAnnouncementForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const isEdit = Boolean(id);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ FETCH IF EDIT
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAnnouncementById(id);

        setTitle(data.title);
        setCategory(data.category);
        setContent(data.content);
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
  }, [id]);

  // ✅ SUBMIT
  const handleSubmit = async (status: AnnouncementStatus) => {
    if (!title.trim() || !category || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        content,
        category,
        status,
      };

      if (isEdit && id) {
        await updateAnnouncement(id, payload);
      } else {
        await createAnnouncement(payload);
      }

      toast({
        title:
          status === "published"
            ? "Announcement Published"
            : "Draft Saved",
      });

      navigate("/admin/announcements");
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

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit Announcement" : "New Announcement"}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Announcement Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* TITLE */}
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* CATEGORY */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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

            {/* CONTENT */}
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <Button
                onClick={() => handleSubmit("published")}
                disabled={loading}
              >
                Publish
              </Button>

              <Button
                variant="outline"
                onClick={() => handleSubmit("draft")}
                disabled={loading}
              >
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
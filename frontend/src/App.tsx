import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "@/context/ProfileContext";
import Landing from "./pages/Landing";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Majors from "./pages/Majors";
import Careers from "./pages/Careers";
import StudyPlan from "./pages/StudyPlan";
import Skills from "./pages/Skills";
import Announcements from "./pages/Announcements";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminAnnouncementForm from "./pages/admin/AdminAnnouncementForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProfileProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/majors" element={<Majors />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
            <Route path="/admin/announcements/new" element={<AdminAnnouncementForm />} />
            <Route path="/admin/announcements/edit/:id" element={<AdminAnnouncementForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProfileProvider>
  </QueryClientProvider>
);

export default App;
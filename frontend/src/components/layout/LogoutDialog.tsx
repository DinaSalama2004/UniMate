import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LogoutDialogProps {
  showText?: boolean;
}

export function LogoutDialog({ showText = false }: LogoutDialogProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear auth state/tokens
    navigate("/login");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size={showText ? "default" : "icon"}
          className={showText ? "w-full justify-start gap-3 text-muted-foreground hover:text-foreground" : ""}
        >
          <LogOut className="w-5 h-5" />
          {showText && <span>Logout</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to the login page. Any unsaved changes may be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

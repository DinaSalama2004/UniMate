import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAPI, extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowLeft, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchAPI("/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      toast.success("Verification sent!");
      // Simulate checking email by navigating directly to reset page, passing the token
      navigate("/reset-password", { state: { email, token: data.reset_token } });
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center relative overflow-hidden group-hover:shadow-glow transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Sparkles className="w-6 h-6 text-primary-foreground relative z-10" />
          </div>
          <span className="text-2xl font-bold text-foreground">UniMate</span>
        </Link>

        <Card className="glass border-white/20 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-hero" />
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-3xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center text-base">
              Enter your email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-foreground">School Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="student@university.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background/50 focus:bg-background transition-colors"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 mt-2 bg-gradient-hero hover:bg-gradient-hero hover:opacity-90 transition-all font-semibold shadow-md active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pb-8 border-t border-border/50 pt-6 mt-2">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium transition-colors flex items-center group">
                <ArrowLeft className="w-3 h-3 mr-1 transform group-hover:-translate-x-1 transition-transform" />
                Back to sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

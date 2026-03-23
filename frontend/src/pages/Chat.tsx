import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type Message = { id: string; role: "user" | "assistant"; content: string };

const initialMessages: Message[] = [
  { id: "1", role: "assistant", content: "Hi! I'm your UniMate AI assistant. I can help you with course recommendations, major selection, career planning, and more. What would you like to know?" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant" as const, 
        content: "Based on your profile with a 3.54 GPA and interests in AI and web development, I recommend focusing on Machine Learning Fundamentals (CS401) next semester. This aligns well with your career goals in software engineering and builds on your strong programming foundation. Would you like me to explain more about this recommendation?" 
      }]);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground">AI Chat</h1>
          <p className="text-muted-foreground">Get personalized guidance for your academic journey</p>
        </div>
        <Card variant="default" className="flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-ai flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
                <div className={`max-w-[70%] p-4 rounded-2xl ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary rounded-bl-md"}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </CardContent>
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input placeholder="Ask about courses, majors, careers..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1" />
              <Button variant="hero" onClick={handleSend}><Send className="w-4 h-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
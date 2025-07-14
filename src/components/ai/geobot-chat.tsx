"use client";

import { useState, useRef, useEffect } from "react";
import { useFlow } from "@genkit-ai/next/client";
import { askGeoBot } from "@/ai/flows/ask-geobot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { GeoNexusLogo } from "../icons";

interface Message {
  role: "user" | "bot";
  text: string;
}

export function GeobotChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [ask, inProgress] = useFlow(askGeoBot, {
    onSuccess: (result) => {
      setMessages((prev) => [...prev, { role: "bot", text: result.answer }]);
    },
    onError: (err) => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `Sorry, an error occurred: ${err.message}` },
      ]);
    },
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom.
        // The viewport is the first child of the ref.
        const viewport = scrollAreaRef.current.children[0] as HTMLDivElement;
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !inProgress) {
      const newMessages: Message[] = [...messages, { role: "user", text: input }];
      setMessages(newMessages);
      ask({ question: input });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border rounded-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "bot" && (
                <Avatar className="w-8 h-8">
                   <div className="w-full h-full flex items-center justify-center bg-primary rounded-full">
                     <GeoNexusLogo className="w-5 h-5 text-primary-foreground"/>
                   </div>
                </Avatar>
              )}
              <div
                className={cn(
                  "p-3 rounded-lg max-w-sm md:max-w-md",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
               {message.role === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person face" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {inProgress && (
             <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8">
                   <div className="w-full h-full flex items-center justify-center bg-primary rounded-full">
                     <GeoNexusLogo className="w-5 h-5 text-primary-foreground"/>
                   </div>
                </Avatar>
                <div className="p-3 rounded-lg bg-secondary">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground"/>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about rock types, geologic periods, etc."
            disabled={inProgress}
          />
          <Button type="submit" disabled={inProgress || !input.trim()}>
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

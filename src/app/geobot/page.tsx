import { GeobotChat } from "@/components/ai/geobot-chat";
import { Bot } from "lucide-react";

export default function GeobotPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
            <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">GeoBot</h1>
            <p className="text-muted-foreground">
            Your AI assistant for all geology-related questions.
            </p>
        </div>
      </div>
      <GeobotChat />
    </div>
  );
}

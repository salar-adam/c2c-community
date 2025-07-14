import { DataSummarizer } from "@/components/ai/data-summarizer";
import { FileText } from "lucide-react";

export default function SummarizeDataPage() {
  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Summary Tool</h1>
                <p className="text-muted-foreground">
                Upload a research paper or log data for a simplified interpretation.
                </p>
            </div>
        </div>
        <DataSummarizer />
    </div>
  );
}

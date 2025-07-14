"use client";

import { useState } from "react";
import { summarizeData } from "@/ai/flows/summarize-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";

export function DataSummarizer() {
  const [data, setData] = useState("");
  const [summary, setSummary] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (data.trim()) {
      setSummary("");
      setError(null);
      setInProgress(true);
      try {
        const result = await summarizeData({ data });
        if (result) {
          setSummary(result.summary);
        }
      } catch (err: any) {
        setSummary(`Error: ${err.message}`);
        setError(`Error: ${err.message}`);
      } finally {
        setInProgress(false);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Input Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your research paper abstract, field notes, or log data here..."
            value={data}
            onChange={(e) => setData(e.target.value)}
            rows={15}
            className="h-full"
          />
          <Button onClick={handleSubmit} disabled={inProgress || !data.trim()}>
            {inProgress ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Summarize
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {inProgress && (
             <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Analyzing data...</p>
             </div>
          )}
          {error && <div className="text-destructive">{error}</div>}
          {summary && !error &&(
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{summary}</p>
            </div>
          )}
          {!summary && !inProgress && !error && (
            <div className="text-muted-foreground">
                Your summary will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

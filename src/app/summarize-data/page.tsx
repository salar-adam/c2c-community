import { DataSummarizer } from "@/components/ai/data-summarizer";

export default function SummarizeDataPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">AI Data Summarizer</h1>
                <p className="text-muted-foreground">
                    Summarize complex research papers or data logs into simple, easy-to-understand terms.
                </p>
            </div>
            <DataSummarizer />
        </div>
    )
}

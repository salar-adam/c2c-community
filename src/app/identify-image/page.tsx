import { ImageIdentifier } from "@/components/ai/image-identifier";
import { ScanSearch } from "lucide-react";

export default function IdentifyImagePage() {
  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
                <ScanSearch className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Image Identification Tool</h1>
                <p className="text-muted-foreground">
                Upload a photo of a rock or strata for an AI-powered preliminary ID.
                </p>
            </div>
        </div>
        <ImageIdentifier />
    </div>
  );
}

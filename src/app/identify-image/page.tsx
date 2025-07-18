import { ImageIdentifier } from "@/components/ai/image-identifier";

export default function IdentifyImagePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Image Identification Tool</h1>
                <p className="text-muted-foreground">
                    Upload a photo of a rock or strata and let our AI provide a preliminary identification.
                </p>
            </div>
            <ImageIdentifier />
        </div>
    )
}
